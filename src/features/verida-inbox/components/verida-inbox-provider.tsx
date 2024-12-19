import { IMessaging } from "@verida/types"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Logger } from "@/features/telemetry/logger"
import {
  VeridaInboxContext,
  VeridaInboxContextType,
} from "@/features/verida-inbox/contexts/verida-inbox-context"
import { VeridaMessagingEngineStatus } from "@/features/verida-inbox/types"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-inbox")

type VeridaInboxProviderProps = {
  children: React.ReactNode
}

export function VeridaInboxProvider(props: VeridaInboxProviderProps) {
  const { children } = props

  const { webUserInstanceRef, isConnected } = useVerida()

  const [messagingEngineStatus, setMessagingEngineStatus] =
    useState<VeridaMessagingEngineStatus>("idle")
  const [messagingEngine, setMessagingEngine] = useState<IMessaging | null>(
    null
  )

  const newMessageHandler = useCallback(async () => {
    // TODO: Handle new message, invalidate the query cache related to the inbox
  }, [])

  useEffect(() => {
    const init = async () => {
      if (!isConnected) {
        setMessagingEngineStatus("idle")
        setMessagingEngine(null)
        return
      }
      setMessagingEngineStatus("loading")

      try {
        const veridaContext = webUserInstanceRef.current.getContext()
        const _messagingEngine = await veridaContext.getMessaging()

        setMessagingEngine(_messagingEngine)
        setMessagingEngineStatus("ready")

        _messagingEngine.onMessage(newMessageHandler)
      } catch (error) {
        setMessagingEngineStatus("error")
        setMessagingEngine(null)
        logger.error(error)
      }
    }

    init().catch(logger.error)

    return () => {
      messagingEngine?.offMessage(newMessageHandler)
    }
  }, [isConnected, webUserInstanceRef, newMessageHandler, messagingEngine])

  const contextValue: VeridaInboxContextType = useMemo(
    () => ({
      messagingEngineStatus,
      messagingEngine,
    }),
    [messagingEngineStatus, messagingEngine]
  )

  return (
    <VeridaInboxContext.Provider value={contextValue}>
      {children}
    </VeridaInboxContext.Provider>
  )
}
VeridaInboxProvider.displayName = "VeridaInboxProvider"
