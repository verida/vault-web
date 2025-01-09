import { useCallback } from "react"

import { Logger } from "@/features/telemetry/logger"
import { MOCK_OAUTH_PAYLOAD } from "@/features/verida-oauth/mock"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-oauth")

export function useVeridaOauth() {
  const { isConnected, isConnecting } = useVerida()

  // TODO: Get the payload

  const handleDeny = useCallback(() => {
    logger.info("Deny OAuth request")
  }, [])

  const handleAllow = useCallback(() => {
    logger.info("Allow OAuth request")
  }, [])

  return {
    isConnected,
    isConnecting,
    payload: MOCK_OAUTH_PAYLOAD,
    handleDeny,
    handleAllow,
  }
}
