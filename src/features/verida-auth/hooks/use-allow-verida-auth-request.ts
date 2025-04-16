import { useCallback } from "react"

import type { VeridaAuthRequestPayload } from "@/features/verida-auth/types"
import { allowVeridaAuthRequest } from "@/features/verida-auth/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export interface UseAllowVeridaAuthRequestArgs {
  payload: VeridaAuthRequestPayload
}

export function useAllowVeridaAuthRequest({
  payload,
}: UseAllowVeridaAuthRequestArgs) {
  const { account, did, getAccountSessionToken } = useVerida()

  const allow = useCallback(async () => {
    if (!did || !account) {
      throw new Error("User not connected")
    }

    const sessionToken = await getAccountSessionToken()

    return await allowVeridaAuthRequest({
      account,
      userDid: did,
      sessionToken,
      payload,
    })
  }, [account, did, getAccountSessionToken, payload])

  return {
    allow,
  }
}
