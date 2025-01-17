import { useCallback } from "react"

import { VeridaAuthRequestPayload } from "@/features/verida-auth/types"
import { denyVeridaAuthRequest } from "@/features/verida-auth/utils"

export interface UseDenyVeridaAuthRequestArgs {
  payload: VeridaAuthRequestPayload
}

export function useDenyVeridaAuthRequest({
  payload,
}: UseDenyVeridaAuthRequestArgs) {
  const deny = useCallback(() => {
    const { redirectUrl } = denyVeridaAuthRequest({ payload })

    window.location.href = redirectUrl
  }, [payload])

  return {
    deny,
  }
}
