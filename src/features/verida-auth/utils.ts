import { WebUser } from "@verida/web-helpers"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import {
  VeridaAuthAuthV1ResponseSchema,
  VeridaAuthGetScopeDefinitionsV1ResponseSchema,
} from "@/features/verida-auth/schemas"
import {
  VeridaAuthApiV1RequestBody,
  VeridaAuthAuthRequest,
  VeridaAuthAuthV1Response,
  VeridaAuthRequestPayload,
  VeridaAuthScope,
  VeridaAuthScopeType,
} from "@/features/verida-auth/types"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"

const logger = Logger.create("verida-auth")

/**
 * Fetches and validates Auth scope definitions from the Verida API.
 *
 * This function retrieves the available Auth scopes that can be requested by
 * applications, validates the response against a schema, and transforms the
 * data into a standardized format.
 *
 * @throws {Error} If the API base URL is not configured
 * @throws {Error} If the HTTP request fails
 * @throws {Error} If the response validation fails
 *
 * @returns Array of standardized Auth scope definitions
 */
export async function getVeridaAuthScopeDefinitions(): Promise<
  VeridaAuthScope[]
> {
  logger.info("Getting Verida Auth scope definitions")

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot get Verida Auth scope definitions due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/auth/scopes`
    )

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    const validatedData =
      VeridaAuthGetScopeDefinitionsV1ResponseSchema.parse(data)

    logger.info("Successfully got Verida Auth scope definitions")

    return Object.entries(validatedData.scopes).map(([id, scope]) => ({
      id,
      type: resolveVeridaAuthScopeType(scope.type),
      description: scope.description,
    }))
  } catch (error) {
    throw new Error("Error getting Verida Auth scope definitions", {
      cause: error,
    })
  }
}

/**
 * Resolves a Verida Auth scope type string to a standardized VeridaAuthScopeType.
 *
 * @param scopeType - The raw scope type string from the Auth scope definition
 * @returns The resolved VeridaAuthScopeType ("api", "data", or "unknown")
 */
function resolveVeridaAuthScopeType(scopeType: string): VeridaAuthScopeType {
  switch (scopeType) {
    case "api":
      return "api"
    case "db":
    case "ds":
      return "data"
    default:
      return "unknown"
  }
}

export interface DenyVeridaAuthRequestArgs {
  payload: VeridaAuthRequestPayload
}

export function denyVeridaAuthRequest({ payload }: DenyVeridaAuthRequestArgs) {
  logger.info("Denying Auth request")

  const redirectUrl = new URL(payload.redirectUrl)
  redirectUrl.searchParams.set("error", "access_denied")
  redirectUrl.searchParams.set("state", payload.state ?? "")

  return {
    redirectUrl: redirectUrl.toString(),
  }
}

export interface AllowVeridaAuthRequestArgs {
  payload: VeridaAuthRequestPayload
  sessionToken: string
  userDid: string
  webUserInstance: WebUser
}

/**
 * Processes an authorization request for a Verida application to access user data.
 *
 * @param args - The arguments for the allowVeridaAuthRequest function
 * @param args.payload - The auth request payload containing scopes, redirectUrl, etc.
 * @param args.sessionToken - User's API session token for authentication
 * @param args.userDid - DID (Decentralized Identifier) of the authenticating user
 * @param args.webUserInstance - Instance of the user's web client
 * @returns Promise resolving to the validated auth response from the API
 * @throws Error if API config is invalid, payload is malformed, or request fails
 */
export async function allowVeridaAuthRequest({
  payload,
  sessionToken,
  userDid,
  webUserInstance,
}: AllowVeridaAuthRequestArgs): Promise<VeridaAuthAuthV1Response> {
  logger.info("Allowing Auth request")

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot get Verida Auth scope definitions due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  if (!payload.scopes.length) {
    throw new Error("Invalid scopes")
  }

  if (!payload.redirectUrl) {
    throw new Error("Invalid redirect URL")
  }

  const now = Math.floor(Date.now() / 1000)

  const authRequest: VeridaAuthAuthRequest = {
    appDID: payload.appDID ?? undefined,
    userDID: userDid,
    scopes: payload.scopes,
    timestamp: now,
  }

  const userAccount = webUserInstance.getAccount()
  const userKeyring = await userAccount.keyring(VERIDA_VAULT_CONTEXT_NAME)
  const user_sig = await userKeyring.sign(authRequest)

  const body: VeridaAuthApiV1RequestBody = {
    client_id: userDid,
    auth_request: JSON.stringify(authRequest),
    redirect_uri: payload.redirectUrl,
    user_sig,
    state: payload.state ?? "",
  }

  try {
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/auth/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": sessionToken,
        },
        body: JSON.stringify(body),
      }
    )

    const data = await response.json()

    const validatedData = VeridaAuthAuthV1ResponseSchema.parse(data)

    logger.info("Successfully allowed Auth request")

    return validatedData
  } catch (error) {
    logger.error(
      new Error("Error allowing Auth request", {
        cause: error,
      })
    )

    const redirectUrl = new URL(payload.redirectUrl)
    redirectUrl.searchParams.set("error", "server_error")
    redirectUrl.searchParams.set("state", payload.state ?? "")

    return {
      redirectUrl: redirectUrl.toString(),
    }
  }
}
