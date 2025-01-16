import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { VeridaOauthRequest } from "@/features/verida-oauth/types"

export function useVeridaOauthRequest() {
  const searchParams = useSearchParams()

  const scopes = searchParams.getAll("scopes")
  const appDID = searchParams.get("appDID")
  const redirectUrl = searchParams.get("redirectUrl")

  const request: VeridaOauthRequest = useMemo(() => {
    if (!redirectUrl || !scopes || scopes.length === 0) {
      return {
        status: "invalid",
        payload: null,
      }
    }

    return {
      status: "valid",
      payload: {
        appDID,
        scopes,
        redirectUrl,
      },
    }
  }, [redirectUrl, scopes, appDID])

  return request
}
