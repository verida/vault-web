import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { useResolvedVeridaAuthScopes } from "@/features/verida-auth/hooks/use-resolved-verida-auth-scopes"
import {
  VeridaAuthRequestAppDIDSchema,
  VeridaAuthRequestPayerSchema,
  VeridaAuthRequestRedirectUrlSchema,
} from "@/features/verida-auth/schemas"
import { VeridaAuthRequest } from "@/features/verida-auth/types"

export function useVeridaAuthRequest(): VeridaAuthRequest {
  const searchParams = useSearchParams()

  const scopes = searchParams.getAll("scopes")
  const appDIDParam = searchParams.get("appDID")
  const payerParam = searchParams.get("payer")
  const redirectUrlParam = searchParams.get("redirectUrl")
  const state = searchParams.get("state") ?? undefined

  const { resolvedScopes, scopeValidity, isError } =
    useResolvedVeridaAuthScopes(scopes)

  const request: VeridaAuthRequest = useMemo(() => {
    // Checking redirectUrl

    const redirectUrlValidationResult =
      VeridaAuthRequestRedirectUrlSchema.safeParse(redirectUrlParam)

    if (!redirectUrlValidationResult.success) {
      return {
        status: "invalid",
        errorDescription: "Invalid redirectUrl",
        redirectUrl: null,
        state,
      }
    }

    const redirectUrl = redirectUrlValidationResult.data

    // Checking appDID

    const appDIDValidationResult =
      VeridaAuthRequestAppDIDSchema.safeParse(appDIDParam)

    if (!appDIDValidationResult.success) {
      return {
        status: "invalid",
        errorDescription: "Invalid appDID",
        redirectUrl,
        state,
      }
    }

    const appDID = appDIDValidationResult.data

    // Checking payer

    const payerValidationResult = VeridaAuthRequestPayerSchema.safeParse(
      payerParam ?? undefined
    )

    if (!payerValidationResult.success) {
      return {
        status: "invalid",
        errorDescription: "Invalid payer",
        redirectUrl,
        state,
      }
    }

    const payer = payerValidationResult.data

    // Checking scopes

    if (!scopes || scopes.length === 0) {
      return {
        status: "invalid",
        errorDescription: "Missing scope",
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
        payer,
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
    redirectUrlParam,
    scopes,
    appDIDParam,
    payerParam,
    state,
    isError,
  ])

  return request
}
