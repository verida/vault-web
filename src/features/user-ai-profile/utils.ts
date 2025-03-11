import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { GetUserAiProfileV1ResponseSchema } from "@/features/user-ai-profile/schemas"
import type { UserAiProfileParams } from "@/features/user-ai-profile/types"

const logger = Logger.create("requests")

export interface GetUserProfileArgs {
  sessionToken: string
  params: UserAiProfileParams
}

/**
 * Fetches a user profile from the Verida API based on a provided schema and parameters.
 *
 * This function makes a POST request to the Verida API's profile endpoint with
 * the provided schema and parameters. The schema defines the structure of the
 * profile data to retrieve, while the parameters provide additional context for
 * the profile request.
 *
 * @param params.sessionToken - The session token for authentication
 * @param params.params - Additional parameters to customize the profile request
 * @returns Promise resolving to the user profile data
 * @throws {Error} If the API is not configured correctly or the request fails
 */
export async function getUserProfile({
  sessionToken,
  params,
}: GetUserProfileArgs) {
  logger.info("Getting user profile")

  try {
    const url = new URL(
      "/api/rest/v1/llm/profile",
      commonConfig.PRIVATE_DATA_API_BASE_URL
    )

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": sessionToken,
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()
    logger.debug("Raw user profile", { data })

    const validatedData = GetUserAiProfileV1ResponseSchema.parse(data)
    logger.debug("Validated user profile", { data: validatedData })

    logger.info("Successfully got user profile")

    return validatedData
  } catch (error) {
    throw new Error("Error getting user profile", { cause: error })
  }
}
