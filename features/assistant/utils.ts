import { commonConfig } from "@/config/client"
import { DUMMY_ANSWERS } from "@/features/assistant/mock"
import { Logger } from "@/features/telemetry"
import { wait } from "@/utils/misc"

import { PrivateDataApiV1LLMPersonalResponseSchema } from "./schemas"

const logger = Logger.create("Assistant")

async function mockProcessUserPrompt(): Promise<string> {
  const answer = DUMMY_ANSWERS[Math.floor(Math.random() * DUMMY_ANSWERS.length)]
  const waitTime = Math.max(500, Math.min(5000, answer.length * 10))
  await wait(waitTime)
  return answer
}

export async function processUserPrompt(
  prompt: string,
  key?: string
): Promise<string> {
  if (!prompt) {
    throw new Error("Prompt is required")
  }

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL || !key) {
    // TODO: Remove this when the API is deployed
    return mockProcessUserPrompt()
  }

  try {
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/llm/personal`,
      {
        method: "POST",
        headers: {
          "key": key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    const validatedData = PrivateDataApiV1LLMPersonalResponseSchema.parse(data)
    return validatedData.result
  } catch (error) {
    throw new Error("Error calling LLM API", {
      cause: error,
    })
  }
}

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

    const eventSource = new EventSource(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/llm/hotload?key=${key}`
    )

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      logger.debug(`API hotload progress: ${data.totalProgress * 100}%`)
      if (progressCallback) {
        progressCallback(data.totalProgress)
      }
      if (data.totalProgress >= 0.99999) {
        // Using a threshold close to 1 to account for potential rounding issues
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
