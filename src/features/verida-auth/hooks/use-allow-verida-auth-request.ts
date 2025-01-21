import { useCallback } from "react"

import { VeridaAuthRequestPayload } from "@/features/verida-auth/types"
import { allowVeridaAuthRequest } from "@/features/verida-auth/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export interface UseAllowVeridaAuthRequestArgs {
  payload: VeridaAuthRequestPayload
}

export function useAllowVeridaAuthRequest({
  payload,
}: UseAllowVeridaAuthRequestArgs) {
  const { did, getAccountSessionToken, webUserInstanceRef } = useVerida()

  const allow = useCallback(async () => {
    if (!did) {
      throw new Error("User not connected")
    }

    const sessionToken = await getAccountSessionToken()

    return await allowVeridaAuthRequest({
      payload,
      sessionToken,
      userDid: did,
      webUserInstance: webUserInstanceRef.current,
    })
  }, [payload, did, getAccountSessionToken, webUserInstanceRef])

  return {
    allow,
  }
}
