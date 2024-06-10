import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useInboxContext } from "./useInboxContext";

export const useInbox = () => {
  const { messagingEngine } = useInboxContext();

  const fetchUnreadMessageCount = useCallback(async () => {
    try {
      const unreadMessages = await messagingEngine?.getMessages({ read: false });
      return unreadMessages.length ?? 0;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }, [messagingEngine]);

  const {
    data: unreadMessageCount,
    isPending: isUnreadMessageCountPending,
    isError: isUnreadMessageCountError,
  } = useQuery({
    queryKey: ["unread"],
    queryFn: fetchUnreadMessageCount,
    enabled: !!messagingEngine,
  });

  return { unreadMessageCount, isUnreadMessageCountPending, isUnreadMessageCountError };
};
