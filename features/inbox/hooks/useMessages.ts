import { useCallback } from "react";
import { useInbox } from "./useInbox";
import { useQuery } from "@tanstack/react-query";

export const useMessages = (messagingEngine: any, filters: Object, offset: number, limit: number = 10) => {
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
    queryFn: () => fetchMessages(offset, limit),
    enabled: !!messagingEngine,
  });

  return { messages };
};
