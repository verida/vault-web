import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { VeridaAuthRequest } from "@/features/verida-auth/types"

export function useVeridaAuthRequest() {
  const searchParams = useSearchParams()

  const scopes = searchParams.getAll("scopes")
  const appDID = searchParams.get("appDID")
  const redirectUrl = searchParams.get("redirectUrl")

  const request: VeridaAuthRequest = useMemo(() => {
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
