import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { getPublicProfile } from "@/features/profiles";

export const useMessages = (
  messagingEngine: any,
  filters: Record<string, any> = {},
  offset: number,
  limit: number = 10
) => {
  const fetchMessages = useCallback(
    async (filters: Record<string, any>, offset: number, limit: number) => {
      try {
        const messages = await messagingEngine?.getMessages(filters, {
          skip: offset,
          limit,
          sort: [{ sentAt: "desc" }],
        });

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
    queryKey: ["messages", offset, limit],
    queryFn: () => fetchMessages(filters, offset, limit),
    enabled: !!messagingEngine,
  });

  return { messages, isMessagesPending, isMessagesError };
};
