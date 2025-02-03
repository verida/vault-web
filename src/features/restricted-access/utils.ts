import { commonConfig } from "@/config/common"
import { GetAccessV1ResponseSchema } from "@/features/restricted-access/schemas"
import { RestrictedAccessStatus } from "@/features/restricted-access/types"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("restricted-access")

/**
 * Get the restricted access status for a given DID
 *
 * @param did - The DID to check
 * @returns The restricted access status
 * @throws Error if there's an issue checking the restricted access status
 */
export async function getRestrictedAccessStatus(
  did: string
): Promise<RestrictedAccessStatus> {
  logger.info("Checking restricted access status", { did })

  try {
    logger.debug("Sending API request to check restricted access status")

    const url = new URL(
      `/api/rest/v1/access/${did}`,
      commonConfig.PRIVATE_DATA_API_BASE_URL
    )

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    const validatedData = GetAccessV1ResponseSchema.parse(data)
    if (validatedData.status === "error") {
      throw new Error(validatedData.errorMessage)
    }

    return validatedData.access
  } catch (error) {
    throw new Error("Error checking restricted access status", { cause: error })
  }
}
