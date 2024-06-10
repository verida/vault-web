import { useVerida } from "@/features/verida";
import { useQueryClient } from "@tanstack/react-query";
import { IMessaging } from "@verida/types";
import React, { createContext, useEffect, useMemo, useState } from "react";

type InboxContextType = {
  messagingEngine: IMessaging | undefined;
};

export const InboxContext = React.createContext<InboxContextType | null>(null);

interface InboxProviderProps extends React.PropsWithChildren {}

export const InboxProvider: React.FunctionComponent<InboxProviderProps> = ({ children }) => {
  const { webUserInstanceRef, isConnected } = useVerida();
  const [messagingEngine, setMessagingEngine] = useState<IMessaging>();
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      });
    };

    init();
  }, [webUserInstanceRef, isConnected, queryClient]);

  const contextValue: InboxContextType = useMemo(() => {
    return { messagingEngine };
  }, [messagingEngine]);

  return <InboxContext.Provider value={contextValue}>{children}</InboxContext.Provider>;
};
