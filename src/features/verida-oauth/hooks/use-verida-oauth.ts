import { useCallback } from "react"

import { Logger } from "@/features/telemetry/logger"
import { MOCK_OAUTH_PAYLOAD } from "@/features/verida-oauth/mock"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-oauth")

const AUTH_ENDPOINT_URL = "https://localhost:5021/api/rest/v1/auth"

export function useVeridaOauth() {
  const {
    isConnected,
    isConnecting,
    did,
    getAccountSessionToken,
    webUserInstanceRef,
  } = useVerida()

  // TODO: Get the payload

  const handleDeny = useCallback(() => {
    logger.info("Deny OAuth request")
  }, [])

  const handleAllow = useCallback(async () => {
    logger.info("Allow Auth request")
    const url = new URL(window.location.href)

    const scopes = url.searchParams.getAll("scopes")
    const redirectUrl = url.searchParams.get("redirectUrl")
    const appDID = url.searchParams.get("appDID")

    if (!scopes || !scopes.length || !redirectUrl) {
      logger.error("Invalid params")
      return
    }

    // @todo: get scopes from server to improve UX
    // const response = await fetch(`${AUTH_ENDPOINT_URL}/scopes`)

    const sessionToken = await getAccountSessionToken()
    const NOW = Math.floor(Date.now() / 1000)

    const ARO = {
      appDID,
      userDID: did,
      scopes,
      timestamp: NOW,
    }

    const userAccount = webUserInstanceRef.current.getAccount()

    // Sign the ARO to generate a consent signature verifying the user account consents to this request
    const userKeyring = await userAccount.keyring("Verida: Vault")
    const user_sig = await userKeyring.sign(ARO)

    // Add custom state data that will be passed back to the third party application on successful login
    const state = {}

    const request = {
      client_id: did,
      auth_request: JSON.stringify(ARO),
      redirect_uri: redirectUrl,
      user_sig,
      // app_sig,
      state: JSON.stringify(state),
    }

    try {
      const response = await fetch(`${AUTH_ENDPOINT_URL}/auth`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": sessionToken,
        },
      })

      const data = await response.json()
      window.location.href = data.redirectUrl
    } catch (err) {
      console.log(err)
    }
  }, [])

  return {
    isConnected,
    isConnecting,
    payload: MOCK_OAUTH_PAYLOAD,
    handleDeny,
    handleAllow,
  }
}
