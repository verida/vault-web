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

  const fetchTotalMessageCount = useCallback(async () => {
    try {
      const inbox = await messagingEngine?.getInbox();
      const inboxDbs = await inbox.getInboxDatastore();
      const database = await inboxDbs.getDb();
      const dbInfo = await database.db.info();

      // 1 record in the db is for permit
      return dbInfo.doc_count - 1;
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

  const {
    data: totalMessageCount,
    isPending: isTotalMessageCountPending,
    isError: isTotalMessageCountError,
  } = useQuery({
    queryKey: ["total"],
    queryFn: fetchTotalMessageCount,
    enabled: !!messagingEngine,
  });

  return {
    unreadMessageCount,
    isUnreadMessageCountPending,
    isUnreadMessageCountError,
    totalMessageCount,
    isTotalMessageCountPending,
    isTotalMessageCountError,
  };
};
