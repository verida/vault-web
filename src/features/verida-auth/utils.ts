import { WebUser } from "@verida/web-helpers"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import {
  VeridaOauthAuthV1ResponseSchema,
  VeridaOauthGetScopeDefinitionsV1ResponseSchema,
} from "@/features/verida-auth/schemas"
import {
  VeridaAuthApiV1RequestBody,
  VeridaAuthRequestPayload,
  VeridaOauthAuthV1Response,
  VeridaOauthRequestPayload,
  VeridaOauthScope,
  VeridaOauthScopeType,
} from "@/features/verida-auth/types"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"

const logger = Logger.create("verida-oauth")

/**
 * Fetches and validates OAuth scope definitions from the Verida API.
 *
 * This function retrieves the available OAuth scopes that can be requested by
 * applications, validates the response against a schema, and transforms the
 * data into a standardized format.
 *
 * @throws {Error} If the API base URL is not configured
 * @throws {Error} If the HTTP request fails
 * @throws {Error} If the response validation fails
 *
 * @returns Array of standardized OAuth scope definitions
 */
export async function getVeridaOauthScopeDefinitions(): Promise<
  VeridaOauthScope[]
> {
  logger.info("Getting Verida OAuth scope definitions")

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot get Verida OAuth scope definitions due to incorrect API configuration"
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
      VeridaOauthGetScopeDefinitionsV1ResponseSchema.parse(data)

    logger.info("Successfully got Verida OAuth scope definitions")

    return Object.entries(validatedData.scopes).map(([id, scope]) => ({
      id,
      type: resolveVeridaOauthScopeType(scope.type),
      description: scope.description,
    }))
  } catch (error) {
    throw new Error("Error getting Verida OAuth scope definitions", {
      cause: error,
    })
  }
}

/**
 * Resolves a Verida OAuth scope type string to a standardized VeridaOauthScopeType.
 *
 * @param scopeType - The raw scope type string from the OAuth scope definition
 * @returns The resolved VeridaOauthScopeType ("api", "data", or "unknown")
 */
function resolveVeridaOauthScopeType(scopeType: string): VeridaOauthScopeType {
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

export function denyVeridaOauthRequest() {
  logger.info("Denying OAuth request")

  // TODO: To implement, if anything to do
}

export interface AllowVeridaOauthRequestArgs {
  payload: VeridaOauthRequestPayload
  sessionToken: string
  userDid: string
  webUserInstance: WebUser
}

export async function allowVeridaOauthRequest({
  payload,
  sessionToken,
  userDid,
  webUserInstance,
}: AllowVeridaOauthRequestArgs): Promise<VeridaOauthAuthV1Response> {
  logger.info("Allowing OAuth request")

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot get Verida OAuth scope definitions due to incorrect API configuration"
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

  const authRequest: VeridaAuthRequestPayload = {
    appDID: payload.appDID ?? undefined,
    userDID: userDid,
    scopes: payload.scopes,
    timestamp: now,
  }

  const userAccount = webUserInstance.getAccount()
  const userKeyring = await userAccount.keyring(VERIDA_VAULT_CONTEXT_NAME)
  const user_sig = await userKeyring.sign(authRequest)

  // TODO: Get the state from the oauth request
  const state = {}

  const body: VeridaAuthApiV1RequestBody = {
    client_id: userDid,
    auth_request: JSON.stringify(authRequest),
    redirect_uri: payload.redirectUrl,
    user_sig,
    state: JSON.stringify(state),
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

    const validatedData = VeridaOauthAuthV1ResponseSchema.parse(data)

    logger.info("Successfully allowed OAuth request")

    return validatedData
  } catch (error) {
    throw new Error("Error allowing OAuth request", {
      cause: error,
    })
  }
}
