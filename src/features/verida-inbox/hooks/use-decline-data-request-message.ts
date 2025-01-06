import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"

import { FetchVeridaDataRecordsResult } from "@/features/verida-database/types"
import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { declineDataRequestMessage } from "@/features/verida-inbox/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

interface DeclineDataRequestMessageArgs {
  messageRecord: VeridaInboxMessageRecord
}

interface MutationContext {
  previousMessageData: VeridaInboxMessageRecord | undefined
  previousMessagesData: [
    QueryKey,
    FetchVeridaDataRecordsResult<VeridaInboxMessageRecord> | undefined,
  ][]
}

interface UseDeclineDataRequestMessageOptions {
  disableOptimisticUpdate?: boolean
}

export function useDeclineDataRequestMessage(
  options?: UseDeclineDataRequestMessageOptions
) {
  const { did } = useVerida()
  const { messagingEngine } = useVeridaInbox()
  const queryClient = useQueryClient()

  const {
    mutate: decline,
    mutateAsync: declineAsync,
    ...mutation
  } = useMutation<void, Error, DeclineDataRequestMessageArgs, MutationContext>({
    mutationFn: async ({ messageRecord }) => {
      if (!messagingEngine) {
        throw new Error("Messaging engine not initialized")
      }

      return declineDataRequestMessage(messagingEngine, messageRecord)
    },
    onMutate: async ({ messageRecord }) => {
      if (options?.disableOptimisticUpdate) {
        return {
          previousMessageData: undefined,
          previousMessagesData: [],
        }
      }

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: VeridaInboxQueryKeys.invalidateInbox(),
      })

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
              r._id === messageRecord._id ? { ...r, read: true } : r
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
          { ...previousMessageData, read: true }
        )
      }

      return { previousMessagesData, previousMessageData }
    },
    onError: (_error, { messageRecord }, context) => {
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
      queryClient.invalidateQueries({
        queryKey: VeridaInboxQueryKeys.invalidateInboxMessages(),
      })

      queryClient.invalidateQueries({
        queryKey: VeridaInboxQueryKeys.invalidateInboxMessage({
          did,
          messageRecordId: messageRecord._id,
        }),
      })
    },
    meta: {
      logCategory: "verida-inbox",
      errorMessage: "Error declining data request message",
    },
  })

  return {
    decline,
    declineAsync,
    ...mutation,
  }
}
