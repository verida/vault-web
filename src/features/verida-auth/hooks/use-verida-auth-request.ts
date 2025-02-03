import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { useResolvedVeridaAuthScopes } from "@/features/verida-auth/hooks/use-resolved-verida-auth-scopes"
import { VeridaAuthRequest } from "@/features/verida-auth/types"
import { isValidVeridaDid } from "@/features/verida/utils"

export function useVeridaAuthRequest(): VeridaAuthRequest {
  const searchParams = useSearchParams()

  const scopes = searchParams.getAll("scopes")
  const appDID = searchParams.get("appDID")
  const redirectUrl = searchParams.get("redirectUrl")
  const state = searchParams.get("state") ?? undefined

  const { resolvedScopes, scopeValidity, isError } =
    useResolvedVeridaAuthScopes(scopes)

  const request: VeridaAuthRequest = useMemo(() => {
    if (!scopes || scopes.length === 0) {
      return {
        status: "invalid",
        errorDescription: "Missing required scopes",
        redirectUrl,
        state,
      }
    }

    if (isError) {
      return {
        status: "error",
        redirectUrl,
        state,
      }
    }

    // As there are scopes in the request, the resolve scopes query will be run
    // and the scopeValidity will eventually be set.

    if (!scopeValidity || !resolvedScopes) {
      return {
        status: "processing",
      }
    }

    if (!appDID) {
      return {
        status: "invalid",
        errorDescription: "Missing appDID",
        redirectUrl,
        state,
      }
    }

    if (!isValidVeridaDid(appDID)) {
      return {
        status: "invalid",
        errorDescription: "Invalid appDID format",
        redirectUrl,
        state,
      }
    }

    if (!redirectUrl) {
      return {
        status: "invalid",
        errorDescription: "Missing redirectURL",
        redirectUrl,
        state,
      }
    }

    const validScopes = Object.entries(scopeValidity)
      .filter(([, isValid]) => isValid)
      .map(([scope]) => scope)

    if (validScopes.length === 0 || resolvedScopes.length === 0) {
      return {
        status: "invalid",
        errorDescription: "No valid scopes",
        redirectUrl,
        state,
      }
    }

    const ignoredScopes = Object.entries(scopeValidity)
      .filter(([, isValid]) => !isValid)
      .map(([scope]) => scope)

    return {
      status: "valid",
      payload: {
        appDID,
        scopes: validScopes,
        redirectUrl,
        state: state ?? undefined,
      },
      ignoredScopes,
      resolvedValidScopes: resolvedScopes,
    }
  }, [
    scopeValidity,
    resolvedScopes,
    redirectUrl,
    scopes,
    appDID,
    state,
    isError,
  ])

  return request
}
