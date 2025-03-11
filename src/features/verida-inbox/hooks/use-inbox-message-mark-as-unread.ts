import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import type { FetchVeridaDataRecordsResult } from "@/features/verida-database/types"
import { useUpdateInboxQueryCache } from "@/features/verida-inbox/hooks/use-update-inbox-query-cache"
import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
import type { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { markMessageAsUnread } from "@/features/verida-inbox/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type InboxMessageMarkAsUnreadMutationArgs = {
  messageRecord: VeridaInboxMessageRecord
}

type MutationContext = {
  previousMessageData: VeridaInboxMessageRecord | undefined
  previousMessagesData: [
    QueryKey,
    FetchVeridaDataRecordsResult<VeridaInboxMessageRecord> | undefined,
  ][]
  previousUnreadCount: number | undefined
}

type UseInboxMessageMarkAsUnreadOptions = {
  disableOptimisticUpdate?: boolean
}

export function useInboxMessageMarkAsUnread(
  options?: UseInboxMessageMarkAsUnreadOptions
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
    mutate: markAsUnread,
    mutateAsync: markAsUnreadAsync,
    ...mutation
  } = useMutation<
    void,
    Error,
    InboxMessageMarkAsUnreadMutationArgs,
    MutationContext
  >({
    mutationFn: async ({ messageRecord }) => {
      if (!messagingEngine) {
        throw new Error("Messaging engine not initialized")
      }

      return markMessageAsUnread(messagingEngine, messageRecord)
    },
    onMutate: async ({ messageRecord }) => {
      if (options?.disableOptimisticUpdate) {
        return {
          previousMessagesData: [],
          previousMessageData: undefined,
          previousUnreadCount: undefined,
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
              r._id === messageRecord._id ? { ...r, read: false } : r
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
          { ...previousMessageData, read: false }
        )
      }

      // Snapshot previous unread count
      const previousUnreadCount = queryClient.getQueryData<number>(
        VeridaInboxQueryKeys.unreadMessagesCount({ did })
      )

      // Optimistically update unread count
      if (previousUnreadCount !== undefined && messageRecord.read) {
        queryClient.setQueryData(
          VeridaInboxQueryKeys.unreadMessagesCount({ did }),
          previousUnreadCount + 1
        )
      }

      return { previousMessagesData, previousMessageData, previousUnreadCount }
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

      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          VeridaInboxQueryKeys.unreadMessagesCount({ did }),
          context.previousUnreadCount
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
      errorMessage: "Error marking message as unread",
    },
  })

  return {
    markAsUnread,
    markAsUnreadAsync,
    ...mutation,
  }
}
