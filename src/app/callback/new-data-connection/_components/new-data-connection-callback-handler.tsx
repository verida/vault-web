"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { useDataConnectionsBroadcast } from "@/features/data-connections/hooks/use-data-connections-broadcast"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("data-connections")

export type NewDataConnectionCallbackHandlerProps = {
  children: React.ReactNode
}

export function NewDataConnectionCallbackHandler(
  props: NewDataConnectionCallbackHandlerProps
) {
  const { children } = props

  const { triggerNewDataConnectionEvent } = useDataConnectionsBroadcast()
  const searchParams = useSearchParams()

  useEffect(() => {
    const connectionId = searchParams.get("connectionId")

    triggerNewDataConnectionEvent({
      connectionId: connectionId ?? undefined,
    })

    logger.debug("Attempting to close the window")
    window.close()

    // If window.close() doesn't work, we can try an alternative approach
    if (!window.closed) {
      logger.warn("window.close() failed, trying alternative method")
      window.opener = null
      window.open("", "_self")
      window.close()
    }
  }, [triggerNewDataConnectionEvent, searchParams])

  return <>{children}</>
}
NewDataConnectionCallbackHandler.displayName =
  "NewDataConnectionCallbackHandler"
