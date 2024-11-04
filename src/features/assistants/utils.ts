import { commonConfig } from "@/config/common"
import {
  DEFAULT_LLM_MODEL,
  DEFAULT_LLM_PROVIDER,
} from "@/features/assistants/constants"
import {
  PrivateDataApiV1LLMPersonalResponseSchema,
  PrivateDataApiV1LlmHotloadResponseSchema,
} from "@/features/assistants/schemas"
import {
  AssistantOutput,
  AssistantUserInput,
} from "@/features/assistants/types"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("assistants")

/**
 * Processes a user prompt by sending it to the LLM API or using a mock response.
 *
 * @param userInput - The user's input
 * @param sessionToken - The session token for authentication
 * @returns A promise that resolves to the AI-generated response
 * @throws Error if the prompt is empty or if there's an issue with the API call
 */
export async function processUserInput(
  userInput: AssistantUserInput,
  sessionToken: string
): Promise<AssistantOutput> {
  if (!userInput) {
    throw new Error("User input is required")
  }

  logger.info("Processing user input")

  // Use mock response if API configuration is missing
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn("Using mock response due to missing API configuration")
    throw new Error("API configuration is missing")
  }

  try {
    logger.debug("Sending request to LLM API")
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/llm/personal`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": sessionToken,
        },
        body: JSON.stringify({
          prompt: userInput.prompt,
          provider: DEFAULT_LLM_PROVIDER,
          model: DEFAULT_LLM_MODEL, // Could come from the user input
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    logger.debug("Received response from LLM API")

    // Validate the API response against the expected schema
    const validatedData = PrivateDataApiV1LLMPersonalResponseSchema.parse(data)
    logger.info("Successfully processed user prompt")

    const output: AssistantOutput = {
      result: validatedData.result,
      processingTime: validatedData.duration,
      databases: validatedData.process.databases,
      keywords: validatedData.process.keywords,
    }

    return output
  } catch (error) {
    throw new Error("Error calling LLM API", { cause: error })
  }
}

/**
 * Initiates the hotloading process for the LLM API.
 *
 * @param sessionToken - The session token for authentication
 * @param progressCallback - Optional callback function to report progress
 * @returns A promise that resolves when hotloading is complete
 */
export function hotloadAPI(
  sessionToken: string,
  progressCallback?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
      reject(new Error("PRIVATE_DATA_API_BASE_URL is not set"))
      return
    }

    logger.info("Starting API hotload")

    // Create an EventSource to receive progress updates
    const url = new URL(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/llm/hotload`
    )
    url.searchParams.append("api_key", sessionToken)
    const eventSource = new EventSource(url.toString())

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data)
      const validatedData =
        PrivateDataApiV1LlmHotloadResponseSchema.safeParse(parsedData)

      if (!validatedData.success) {
        // Unsure if the API only returns the progress response or something
        // else, like the retry count. In doubt, just disregard.
        return
      }

      const { data } = validatedData

      logger.debug(`API hotload progress: ${data.totalProgress * 100}%`)
      if (progressCallback) {
        progressCallback(data.totalProgress)
      }

      // Check if hotloading is complete (using a threshold close to 1 to account for potential rounding issues)
      if (data.totalProgress >= 0.99999) {
        eventSource.close()
        logger.info("API hotload completed")
        resolve()
      }
    }

    eventSource.onerror = (error) => {
      eventSource.close()
      reject(new Error("Error hot loading LLM API", { cause: error }))
    }
  })
}
