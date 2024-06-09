import { useVerida } from "@/features/verida";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IMessaging } from "@verida/types";
import { useCallback, useEffect, useState } from "react";

export const useInbox = () => {
  const { webUserInstanceRef, isConnected } = useVerida();

  const queryClient = useQueryClient();

  const [messagingEngine, setMessagingEngine] = useState<IMessaging>();

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
    refetchInterval: 60000,
  });

  useEffect(() => {
    const init = async () => {
      if (!isConnected) {
        return;
      }

      const veridaContext = await webUserInstanceRef.current.getContext();
      const _messagingEngine = await veridaContext.getMessaging();
      setMessagingEngine(_messagingEngine);

      _messagingEngine.onMessage(() => {
        queryClient.invalidateQueries({ queryKey: ["unread"] });
      });
    };

    init();
  }, [webUserInstanceRef, isConnected, queryClient]);

  return { messagingEngine };
};
