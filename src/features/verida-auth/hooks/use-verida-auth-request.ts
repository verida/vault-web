import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { VeridaAuthRequest } from "@/features/verida-auth/types"
import { isValidVeridaDid } from "@/features/verida/utils"

export function useVeridaAuthRequest() {
  const searchParams = useSearchParams()

  const scopes = searchParams.getAll("scopes")
  const appDID = searchParams.get("appDID")
  const redirectUrl = searchParams.get("redirectUrl")
  const state = searchParams.get("state")

  const request: VeridaAuthRequest = useMemo(() => {
    if (!appDID) {
      return {
        status: "invalid",
        payload: null,
        errorDescription: "Missing appDID",
      }
    }

    if (!isValidVeridaDid(appDID)) {
      return {
        status: "invalid",
        payload: null,
        errorDescription: "Invalid appDID format",
      }
    }

    if (!redirectUrl) {
      return {
        status: "invalid",
        payload: null,
        errorDescription: "Missing redirectURL",
      }
    }

    if (!scopes || scopes.length === 0) {
      return {
        status: "invalid",
        payload: null,
        errorDescription: "Missing required scopes",
      }
    }

    return {
      status: "valid",
      payload: {
        appDID,
        scopes,
        redirectUrl,
        state: state ?? undefined,
      },
    }
  }, [redirectUrl, scopes, appDID, state])

  return request
}
