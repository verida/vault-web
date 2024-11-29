import { commonConfig } from "@/config/common"
import {
  PrivateDataApiV1LLMPersonalResponseSchema,
  PrivateDataApiV1LlmHotloadResponseSchema,
  PromptConfigSchema,
} from "@/features/assistants/schemas"
import {
  AiAssistantOutput,
  AiPromptInput,
  PrivateDataApiV1LLMPersonalRequestBody,
} from "@/features/assistants/types"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("assistants")

/**
 * Processes an AI prompt by sending it to the AI assistant API.
 *
 * @param aiPromptInput - The prompt input to send
 * @param sessionToken - The session token for authentication
 * @returns A promise that resolves to the AI assistant output
 * @throws Error if the prompt is empty or if there's an issue with the API call
 */
export async function sendAiPromptInputToAssistant(
  aiPromptInput: AiPromptInput,
  sessionToken: string
): Promise<AiAssistantOutput> {
  logger.info("Processing prompt input")

  // Use mock response if API configuration is missing
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Unable to process prompt input due to missing API configuration"
    )
    throw new Error("API configuration is missing")
  }

  if (!aiPromptInput.prompt) {
    throw new Error("Prompt is required")
  }

  const promptConfigValidationResult = PromptConfigSchema.safeParse(
    aiPromptInput.config?.promptConfig
  )

  // Explicitly building the body to ensure that the request is correct
  // Mostly because the structures are not the same
  // But also because aiPromptInput may have additional fields
  const body: PrivateDataApiV1LLMPersonalRequestBody = {
    prompt: aiPromptInput.prompt,
    provider:
      aiPromptInput.config?.llmProvider ?? commonConfig.DEFAULT_AI_PROVIDER,
    model: aiPromptInput.config?.llmModel ?? commonConfig.DEFAULT_AI_MODEL,
    promptConfig: promptConfigValidationResult.success
      ? aiPromptInput.config?.promptConfig
      : undefined,
  }

  try {
    logger.debug("Sending request to AI assistant API")
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/llm/personal`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": sessionToken,
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    logger.debug("Received response from AI assistant API")

    // Validate the API response against the expected schema
    const validatedData = PrivateDataApiV1LLMPersonalResponseSchema.parse(data)
    logger.info("Successfully processed prompt input")

    const output: AiAssistantOutput = {
      assistantId: aiPromptInput.assistantId,
      status: "processed",
      result: validatedData.result,
      processedAt: new Date(),
      processingTime: validatedData.duration,
      databases: validatedData.process.databases,
    }

    return output
  } catch (error) {
    throw new Error("Error calling AI assistant API", { cause: error })
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
    logger.info("Starting AI assistant hotload")

    if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
      logger.warn("Unable to hotload AI assistant due to missing configuration")
      reject(new Error("API configuration is missing"))
      return
    }

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

      logger.debug(
        `AI assistant hotload progress: ${data.totalProgress * 100}%`
      )
      if (progressCallback) {
        progressCallback(data.totalProgress)
      }

      // Check if hotloading is complete (using a threshold close to 1 to account for potential rounding issues)
      if (data.totalProgress >= 0.99999) {
        eventSource.close()
        logger.info("AI assistant hotload completed")
        resolve()
      }
    }

    eventSource.onerror = (error) => {
      eventSource.close()
      reject(new Error("Error hotloading AI assistant", { cause: error }))
    }
  })
}
