import { commonConfig } from "@/config/client"
import { DUMMY_ANSWERS } from "@/features/assistant/mock"
import { Logger } from "@/features/telemetry"
import { wait } from "@/utils/misc"

import { PrivateDataApiV1LLMPersonalResponseSchema } from "./schemas"

const logger = Logger.create("Assistant")

/**
 * Simulates a response from the AI assistant for testing purposes.
 * @returns A promise that resolves to a randomly selected mock answer.
 */
async function mockProcessUserPrompt(): Promise<string> {
  // Select a random answer from the predefined list
  const answer = DUMMY_ANSWERS[Math.floor(Math.random() * DUMMY_ANSWERS.length)]
  // Calculate a wait time based on the answer length, between 500ms and 5000ms
  const waitTime = Math.max(500, Math.min(5000, answer.length * 10))
  await wait(waitTime)
  return answer
}

/**
 * Processes a user prompt by sending it to the LLM API or using a mock response.
 *
 * @param prompt - The user's input prompt
 * @param key - The API key for authentication
 * @returns A promise that resolves to the AI-generated response
 * @throws Error if the prompt is empty or if there's an issue with the API call
 */
export async function processUserPrompt(
  prompt: string,
  key?: string
): Promise<string> {
  if (!prompt) {
    throw new Error("Prompt is required")
  }

  logger.info("Processing user prompt")

  // Use mock response if API configuration is missing
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL || !key) {
    logger.warn("Using mock response due to missing API configuration")
    return mockProcessUserPrompt()
  }

  try {
    logger.debug("Sending request to LLM API")
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/llm/personal`,
      {
        method: "POST",
        headers: {
          "key": key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
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
    return validatedData.result
  } catch (error) {
    throw new Error("Error calling LLM API", { cause: error })
  }
}

/**
 * Initiates the hotloading process for the LLM API.
 *
 * @param key - The API key for authentication
 * @param progressCallback - Optional callback function to report progress
 * @returns A promise that resolves when hotloading is complete
 */
export function hotloadAPI(
  key: string,
  progressCallback?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
      reject(new Error("PRIVATE_DATA_API_BASE_URL is not set"))
      return
    }

    logger.info("Starting API hotload")

    // Create an EventSource to receive progress updates
    const eventSource = new EventSource(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/llm/hotload?key=${key}`
    )

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
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
