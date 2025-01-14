import {
  BaseRequestSchema,
  UserProfileApiRequestSchema,
} from "@/features/requests/schemas"
import {
  UserProfileApiRequest,
  UserProfileApiRequestBody,
} from "@/features/requests/types"
import { Logger } from "@/features/telemetry/logger"

const FAKE_PROFILE = {
  fullName: "Test",
  occupation: "Founder in Decentralized Identity",
  country: "Australia",
  region: "Adelaide",
  traits: {
    visionary: {
      value: true,
      explanation:
        "Active member of Decentralized Identity Foundation, consistently involved in cutting-edge identity technology initiatives, demonstrating forward-thinking approach to digital identity solutions",
    },
    resilience: {
      value: 9,
      explanation:
        "Consistently engaged in multiple complex technology projects like Verida AI, DIF initiatives, and navigating challenging decentralized identity landscapes, showing high adaptability and persistence",
    },
    riskTolerance: {
      value: 8,
      explanation:
        "Involved in innovative blockchain and Web3 technologies, participating in hackathons, and leading experimental projects in decentralized identity, indicating high willingness to take calculated risks",
    },
    adaptability: {
      value: 9,
      explanation:
        "Demonstrates flexibility across multiple technology domains including AI, blockchain, decentralized identity, and confidential computing networks, showing exceptional ability to pivot and learn",
    },
    drive: {
      value: 10,
      explanation:
        "Actively leads multiple technology initiatives, participates in global foundation working groups, consistently pushing boundaries of decentralized identity technology",
    },
    decisionMaking: {
      value: 8,
      explanation:
        "Involved in strategic decision-making for Verida and DIF, showing ability to make prompt decisions in complex technological environments",
    },
  },
}

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

/**
 * Accepts a user profile API request by sending the generated profile to the specified endpoint.
 *
 * This function takes a user profile API request and a generated profile,
 * constructs the appropriate request body, and sends it to the endpoint
 * specified in the request. The request body includes the generated profile,
 * the JSON schema for validation, and any integration parameters.
 *
 * @param request - The user profile API request containing endpoint and schema information
 * @param generatedProfile - The generated user profile data to be sent
 * @throws {Error} If the endpoint URI is missing or if the request fails
 */
export async function acceptUserProfileApiRequest(
  request: UserProfileApiRequest,
  generatedProfile: Record<string, unknown>
) {
  logger.info("Accepting user profile API request")

  if (!request.endpointUrl) {
    throw new Error("Endpoint URL is required")
  }

  try {
    const requestBody: UserProfileApiRequestBody = {
      jsonProfile: generatedProfile,
      jsonSchemaUrl: request.profileJsonSchemaUrl,
      params: request.endpointParams ?? {},
    }

    const response = await fetch(request.endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    logger.info("User profile API request accepted Successfully")
  } catch (error) {
    throw new Error("Error accepting user profile API request", {
      cause: error,
    })
  }
}
