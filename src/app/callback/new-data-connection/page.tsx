"use client"

import { useEffect } from "react"

import { useDataConnectionsContext } from "@/features/data-connections"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("NewDataConnectionCallbackPage")

export default function NewDataConnectionCallbackPage() {
  const { triggerNewDataConnectionEvent } = useDataConnectionsContext()

  useEffect(() => {
    // TODO: Get connectionId from search params

    triggerNewDataConnectionEvent({
      connectionId: undefined, // TODO: Add connectionId when available
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
  }, [triggerNewDataConnectionEvent])

  return null
}
