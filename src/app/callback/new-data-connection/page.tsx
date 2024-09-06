"use client"

import { useEffect } from "react"

import { useDataConnectionsContext } from "@/features/data-connections"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("NewDataConnectionsCallbackPage")

export default function NewDataConnectionsCallbackPage() {
  const { triggerNewDataConnectionEvent } = useDataConnectionsContext()

  useEffect(() => {
    triggerNewDataConnectionEvent()

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
