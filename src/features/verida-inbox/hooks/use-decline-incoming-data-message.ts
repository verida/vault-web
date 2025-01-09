import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"

import { FetchVeridaDataRecordsResult } from "@/features/verida-database/types"
import { useUpdateInboxQueryCache } from "@/features/verida-inbox/hooks/use-update-inbox-query-cache"
import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { declineIncomingDataMessage } from "@/features/verida-inbox/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

interface DeclineIncomingDataMessageArgs {
  messageRecord: VeridaInboxMessageRecord
}

interface MutationContext {
  previousMessageData: VeridaInboxMessageRecord | undefined
  previousMessagesData: [
    QueryKey,
    FetchVeridaDataRecordsResult<VeridaInboxMessageRecord> | undefined,
  ][]
}

interface UseDeclineIncomingDataMessageOptions {
  disableOptimisticUpdate?: boolean
}

export function useDeclineIncomingDataMessage(
  options?: UseDeclineIncomingDataMessageOptions
) {
  const { did } = useVerida()
  const { messagingEngine } = useVeridaInbox()
  const queryClient = useQueryClient()
  const {
    cancelInboxQueries,
    invalidateInboxMessage,
    invalidateInboxMessages,
    invalidateUnreadMessagesCount,
  } = useUpdateInboxQueryCache()

  const {
    mutate: decline,
    mutateAsync: declineAsync,
    ...mutation
  } = useMutation<void, Error, DeclineIncomingDataMessageArgs, MutationContext>(
    {
      mutationFn: async ({ messageRecord }) => {
        if (!messagingEngine) {
          throw new Error("Messaging engine not initialized")
        }

        return declineIncomingDataMessage(messagingEngine, messageRecord)
      },
      onMutate: async ({ messageRecord }) => {
        if (options?.disableOptimisticUpdate) {
          return {
            previousMessageData: undefined,
            previousMessagesData: [],
          }
        }

        // Cancel any outgoing refetches
        await cancelInboxQueries()

        // TODO: Try to factorise the following code with the other mutation hooks

        // Snapshot previous messages data
        const previousMessagesData = queryClient.getQueriesData<
          FetchVeridaDataRecordsResult<VeridaInboxMessageRecord>
        >({
          queryKey: VeridaInboxQueryKeys.invalidateInboxMessages(),
        })

        // Optimistically update messages data
        previousMessagesData.forEach(([queryKey, queryData]) => {
          if (queryData) {
            queryClient.setQueryData(queryKey, {
              ...queryData,
              records: queryData.records.map((r) =>
                r._id === messageRecord._id
                  ? {
                      ...r,
                      data: {
                        ...(r.data as any),
                        status: "reject",
                      },
                      read: true,
                    }
                  : r
              ),
            })
          }
        })

        // Snapshot previous message data
        const previousMessageData =
          queryClient.getQueryData<VeridaInboxMessageRecord>(
            VeridaInboxQueryKeys.inboxMessage({
              did,
              messageRecordId: messageRecord._id,
            })
          )

        // Optimistically update message data
        if (previousMessageData) {
          queryClient.setQueryData(
            VeridaInboxQueryKeys.inboxMessage({
              did,
              messageRecordId: messageRecord._id,
            }),
            {
              ...previousMessageData,
              data: {
                ...(previousMessageData.data as any),
                status: "reject",
              },
              read: true,
            }
          )
        }

        return { previousMessagesData, previousMessageData }
      },
      onError: (_error, { messageRecord }, context) => {
        // TODO: Try to factorise the following code with the other mutation hooks

        if (context?.previousMessagesData) {
          context.previousMessagesData.forEach(([queryKey, queryData]) => {
            queryClient.setQueryData(queryKey, queryData)
          })
        }

        if (context?.previousMessageData) {
          queryClient.setQueryData(
            VeridaInboxQueryKeys.inboxMessage({
              did,
              messageRecordId: messageRecord._id,
            }),
            context.previousMessageData
          )
        }
      },
      onSuccess: (_data, { messageRecord }) => {
        invalidateInboxMessages()
        invalidateInboxMessage(messageRecord._id)
        invalidateUnreadMessagesCount()
      },
      meta: {
        logCategory: "verida-inbox",
        errorMessage: "Error declining incoming data message",
      },
    }
  )

  return {
    decline,
    declineAsync,
    ...mutation,
  }
}
