import { useCallback } from "react"

import { VeridaOauthRequestPayload } from "@/features/verida-auth/types"
import { denyVeridaOauthRequest } from "@/features/verida-auth/utils"

export interface UseDenyVeridaOauthRequestArgs {
  payload: VeridaOauthRequestPayload
}

export function useDenyVeridaOauthRequest({
  payload,
}: UseDenyVeridaOauthRequestArgs) {
  const deny = useCallback(() => {
    denyVeridaOauthRequest()

    window.location.href = payload.redirectUrl
  }, [payload])

  return {
    deny,
  }
}
