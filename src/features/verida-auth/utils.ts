import { WebUser } from "@verida/web-helpers"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import {
  VeridaAuthAuthV1ResponseSchema,
  VeridaAuthGetScopeDefinitionsV1ResponseSchema,
  VeridaAuthResolveScopesV1ResponseSchema,
} from "@/features/verida-auth/schemas"
import {
  InvalidVeridaAuthRequest,
  VeridaAuthApiV1RequestBody,
  VeridaAuthAuthorizationRequestObject,
  VeridaAuthRequestPayload,
  VeridaAuthScope,
  VeridaAuthScopePermission,
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

interface ResolveVeridaAuthScopesOutput {
  resolvedScopes: VeridaAuthScope[]
  scopeValidity: Record<string, boolean>
}

/**
 * Resolves a list of Verida Auth scope strings into detailed scope definitions.
 * Makes a request to the Verida Private Data API to validate and resolve the scopes.
 *
 * @param scopes - Array of scope strings to resolve (e.g. ["api:ds-query"])
 * @returns Object containing:
 *   - resolvedScopes: Array of detailed VeridaAuthScope objects with type, name, permissions etc.
 *   - scopeValidity: Record mapping each input scope string to boolean indicating if it's valid
 *
 * @throws {Error} If the Private Data API URL is not configured
 * @throws {Error} If the HTTP request fails
 * @throws {Error} If the response validation fails
 */
export async function resolveVeridaAuthScopes(
  scopes: string[]
): Promise<ResolveVeridaAuthScopesOutput> {
  logger.info("Resolving Verida Auth scopes")

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot resolve Verida Auth scopes due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
    const url = new URL(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/auth/resolve-scopes`
    )

    for (const scope of scopes) {
      url.searchParams.append("scopes", scope)
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    const validatedData = VeridaAuthResolveScopesV1ResponseSchema.parse(data)

    logger.info("Successfully resolved Verida Auth scopes")

    const resolvedScopes = validatedData.scopes.map(
      (scope): VeridaAuthScope => {
        return {
          type: resolveVeridaAuthScopeType(scope.type),
          name: scope.name,
          namePlural: scope.namePlural,
          description: scope.description,
          permissions: scope.permissions?.map((permission) =>
            resolveVeridaAuthScopePermission(permission)
          ),
          uri: scope.uri,
        }
      }
    )

    return {
      resolvedScopes,
      scopeValidity: validatedData.scopeValidity,
    }
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

/**
 * Resolves a Verida Auth scope permission string to a standardized VeridaAuthScopePermission.
 *
 * @param scopePermission - The raw permission string from the Auth scope definition ('r', 'w', 'd')
 * @returns The resolved VeridaAuthScopePermission ("read", "write", "delete", or "unknown")
 */
function resolveVeridaAuthScopePermission(
  scopePermission: string
): VeridaAuthScopePermission {
  switch (scopePermission) {
    case "r":
      return "read"
    case "w":
      return "write"
    case "d":
      return "delete"
    default:
      return "unknown"
  }
}

export interface AllowVeridaAuthRequestArgs {
  payload: VeridaAuthRequestPayload
  sessionToken: string
  userDid: string
  webUserInstance: WebUser
}

export interface AllowVeridaAuthRequestOutput {
  redirectUrl: string
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
}: AllowVeridaAuthRequestArgs): Promise<AllowVeridaAuthRequestOutput> {
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

  const authRequest: VeridaAuthAuthorizationRequestObject = {
    appDID: payload.appDID,
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

    return {
      redirectUrl: validatedData.redirectUrl,
    }
  } catch (error) {
    throw new Error("Error allowing Auth request", {
      cause: error,
    })
  }
}

/**
 * Builds a redirect URL for when a server error occurs during auth request processing.
 *
 * @param payload - The original auth request payload containing the redirect URL and state
 * @param errorDescription - Optional description of the server error that occurred. Defaults to generic error message.
 * @returns The formatted redirect URL string with error parameters added
 */
export function buildErrorRedirectUrl(
  payload: VeridaAuthRequestPayload,
  errorDescription: string = "Something went wrong when granting access"
) {
  const redirectUrl = new URL(payload.redirectUrl)
  redirectUrl.searchParams.set("error", "server_error")
  redirectUrl.searchParams.set("error_description", errorDescription)
  redirectUrl.searchParams.set("state", payload.state ?? "")
  return redirectUrl.toString()
}

/**
 * Builds a redirect URL for when an auth request is invalid.
 *
 * @param request - The invalid auth request containing the redirect URL and state
 * @param errorDescription - A description of why the request was invalid
 * @returns The formatted redirect URL string with error parameters, or null if no redirect URL exists
 */
export function buildInvalidRequestRedirectUrl(
  request: InvalidVeridaAuthRequest,
  errorDescription: string
) {
  if (!request.redirectUrl) {
    return null
  }

  const url = new URL(request.redirectUrl)
  url.searchParams.set("error", "invalid_request")
  url.searchParams.set("error_description", errorDescription)
  url.searchParams.set("state", request.state ?? "")
  return url.toString()
}

/**
 * Builds a redirect URL for when a user denies an auth request.
 *
 * @param payload - The original auth request payload containing the redirect URL and state
 * @returns The formatted redirect URL string with error parameters added
 */
export function buildDenyRequestRedirectUrl(payload: VeridaAuthRequestPayload) {
  const redirectUrl = new URL(payload.redirectUrl)
  redirectUrl.searchParams.set("error", "access_denied")
  redirectUrl.searchParams.set("error_description", "User denied access")
  redirectUrl.searchParams.set("state", payload.state ?? "")

  return redirectUrl.toString()
}
