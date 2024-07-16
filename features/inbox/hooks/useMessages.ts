import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { getPublicProfile } from "@/features/profiles";
import { useVerida } from "@/features/verida";

export const useMessages = (
  messagingEngine: any,
  filters: Record<string, any>,
  offset: number,
  limit: number = 10
) => {
  const { did } = useVerida();
  const fetchMessages = useCallback(
    async (offset: number, limit: number) => {
      try {
        const messages = await messagingEngine?.getMessages(
          {},
          {
            skip: offset,
            limit,
            sort: [{ sentAt: "desc" }],
          }
        );

        for (const message of messages) {
          const { did, contextName } = message.sentBy;
          const profile = await getPublicProfile(did, contextName);
          message.sentBy = { ...message.sentBy, ...profile };
        }

        return messages;
      } catch (err) {
        return [];
      }
    },
    [messagingEngine]
  );

  const {
    data: messages,
    isPending: isMessagesPending,
    isError: isMessagesError,
  } = useQuery({
    queryKey: [did, "inbox", "messages", offset, limit],
    queryFn: () => fetchMessages(offset, limit),
    enabled: !!messagingEngine,
    staleTime: 0,
  });

  return { messages, isMessagesPending, isMessagesError };
};
