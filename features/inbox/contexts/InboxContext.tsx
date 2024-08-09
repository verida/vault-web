import { useQueryClient } from "@tanstack/react-query"
import { IMessaging } from "@verida/types"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useThrottledCallback } from "use-debounce"

import { useVerida } from "@/features/verida"

type InboxContextType = {
  messagingEngine: IMessaging | undefined
}

export const InboxContext = React.createContext<InboxContextType | null>(null)

interface InboxProviderProps extends React.PropsWithChildren {}

export const InboxProvider: React.FunctionComponent<InboxProviderProps> = ({
  children,
}) => {
  const { webUserInstanceRef, isConnected } = useVerida()
  const [messagingEngine, setMessagingEngine] = useState<IMessaging>()
  const queryClient = useQueryClient()

  const latestNotificationRef = useRef<any>(null)

  const onMessage = useThrottledCallback(
    useCallback(
      async function onMessage(newMessage: any) {
        // TODO: Validate the message with zod, so it is properly typed
        if (
          !newMessage ||
          // Duplicated message, just ignore
          latestNotificationRef.current?._id === newMessage?._id
        ) {
          return
        }

        queryClient.invalidateQueries({ queryKey: ["inbox"] })

        latestNotificationRef.current = newMessage
      },
      [queryClient]
    ),
    500
  )

  useEffect(() => {
    const init = async () => {
      if (!isConnected) {
        return
      }

      const veridaContext = await webUserInstanceRef.current.getContext()
      const _messagingEngine = await veridaContext.getMessaging()

      setMessagingEngine(_messagingEngine)

      _messagingEngine.offMessage(onMessage)
      _messagingEngine.onMessage(onMessage)
    }

    init()
  }, [webUserInstanceRef, isConnected, queryClient, onMessage])

  const contextValue: InboxContextType = useMemo(() => {
    return { messagingEngine }
  }, [messagingEngine])

  return (
    <InboxContext.Provider value={contextValue}>
      {children}
    </InboxContext.Provider>
  )
}
