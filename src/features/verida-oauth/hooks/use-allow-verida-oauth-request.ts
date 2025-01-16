import { useCallback } from "react"

import { VeridaOauthRequestPayload } from "@/features/verida-oauth/types"
import { allowVeridaOauthRequest } from "@/features/verida-oauth/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export interface UseAllowVeridaOauthRequestArgs {
  payload: VeridaOauthRequestPayload
}

export function useAllowVeridaOauthRequest({
  payload,
}: UseAllowVeridaOauthRequestArgs) {
  const { did, getAccountSessionToken, webUserInstanceRef } = useVerida()

  const allow = useCallback(async () => {
    if (!did) {
      return
    }

    const sessionToken = await getAccountSessionToken()

    const { redirectUrl } = await allowVeridaOauthRequest({
      payload,
      sessionToken,
      userDid: did,
      webUserInstance: webUserInstanceRef.current,
    })

    window.location.href = redirectUrl
  }, [payload, did, getAccountSessionToken, webUserInstanceRef])

  return {
    allow,
  }
}
