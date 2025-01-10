import {
  BaseRequestSchema,
  UserProfileApiRequestSchema,
} from "@/features/requests/schemas"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("requests")

/**
 * Decodes a base64 encoded request string into a request object.
 *
 * This function takes an encoded request string, decodes it from base64 to UTF-8,
 * and parses the resulting JSON string into a JavaScript object.
 *
 * @param encodedRequest - The base64 encoded request string to decode
 * @returns The decoded request object
 * @throws {Error} If decoding or parsing fails, wraps the original error
 *
 * @example
 * ```ts
 * const encodedRequest = "eyJ0eXBlIjoidXNlclByb2ZpbGVBcGlSZXF1ZXN0In0="
 * const request = decodeRequest(encodedRequest)
 * // Returns: { type: "userProfileApiRequest", ... }
 * ```
 */
export function decodeRequest(encodedRequest: string) {
  logger.info("Decoding request")

  try {
    const decodedRequest = Buffer.from(encodedRequest, "base64").toString(
      "utf8"
    )
    const rawRequest = JSON.parse(decodedRequest)

    const baseRequestResult = BaseRequestSchema.safeParse(rawRequest)

    if (!baseRequestResult.success) {
      throw new Error("Invalid request")
    }

    switch (baseRequestResult.data.type) {
      case "userProfileApiRequest":
        return UserProfileApiRequestSchema.parse(rawRequest)
      default:
        throw new Error("Unsupported request type")
    }
  } catch (error) {
    throw new Error("Error decoding request", { cause: error })
  }
}
