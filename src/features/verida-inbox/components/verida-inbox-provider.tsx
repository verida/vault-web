import { IMessaging } from "@verida/types"
import { useCallback, useEffect, useMemo, useRef } from "react"

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

  const messagingEngineRef = useRef<IMessaging>()

  const newMessageHandler = useCallback(async () => {
    // TODO: Handle new message, invalidate the query cache related to the inbox
  }, [])

  useEffect(() => {
    const init = async () => {
      if (!isConnected) {
        messagingEngineRef.current = undefined
        return
      }

      const veridaContext = webUserInstanceRef.current.getContext()
      messagingEngineRef.current = await veridaContext.getMessaging()

      messagingEngineRef.current.onMessage(newMessageHandler)
    }

    init().catch(logger.error)

    return () => {
      messagingEngineRef.current?.offMessage(newMessageHandler)
    }
  }, [isConnected, webUserInstanceRef, newMessageHandler])

  const contextValue: VeridaInboxContextType = useMemo(
    () => ({
      messagingEngineRef,
    }),
    [messagingEngineRef]
  )

  return (
    <VeridaInboxContext.Provider value={contextValue}>
      {children}
    </VeridaInboxContext.Provider>
  )
}
VeridaInboxProvider.displayName = "VeridaInboxProvider"
