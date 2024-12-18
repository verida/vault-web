import { IMessaging } from "@verida/types"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Logger } from "@/features/telemetry/logger"
import {
  VeridaInboxContext,
  VeridaInboxContextType,
} from "@/features/verida-inbox/contexts/verida-inbox-context"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-inbox")

type VeridaInboxProviderProps = {
  children: React.ReactNode
}

export function VeridaInboxProvider(props: VeridaInboxProviderProps) {
  const { children } = props

  const { webUserInstanceRef, isConnected } = useVerida()

  const [messagingEngine, setMessagingEngine] = useState<IMessaging | null>(
    null
  )

  const newMessageHandler = useCallback(async () => {
    // TODO: Handle new message, invalidate the query cache related to the inbox
  }, [])

  useEffect(() => {
    const init = async () => {
      if (!isConnected) {
        setMessagingEngine(null)
        return
      }

      const veridaContext = webUserInstanceRef.current.getContext()
      const _messagingEngine = await veridaContext.getMessaging()

      setMessagingEngine(_messagingEngine)

      _messagingEngine.onMessage(newMessageHandler)
    }

    init().catch(logger.error)

    return () => {
      messagingEngine?.offMessage(newMessageHandler)
    }
  }, [isConnected, webUserInstanceRef, newMessageHandler, messagingEngine])

  const contextValue: VeridaInboxContextType = useMemo(
    () => ({
      messagingEngine,
    }),
    [messagingEngine]
  )

  return (
    <VeridaInboxContext.Provider value={contextValue}>
      {children}
    </VeridaInboxContext.Provider>
  )
}
VeridaInboxProvider.displayName = "VeridaInboxProvider"
