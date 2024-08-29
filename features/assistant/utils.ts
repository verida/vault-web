import { commonConfig } from "@/config/client"
import { DUMMY_ANSWERS } from "@/features/assistant/mock"
import { wait } from "@/utils/misc"

import { PrivateDataApiV1LLMPersonalResponseSchema } from "./schemas"

async function mockProcessUserPrompt(): Promise<string> {
  const answer = DUMMY_ANSWERS[Math.floor(Math.random() * DUMMY_ANSWERS.length)]
  const waitTime = Math.max(500, Math.min(5000, answer.length * 10))
  await wait(waitTime)
  return answer
}

export async function processUserPrompt(prompt: string): Promise<string> {
  if (!prompt) {
    throw new Error("Prompt is required")
  }

  if (
    !commonConfig.PRIVATE_DATA_API_BASE_URL ||
    !commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
  ) {
    // TODO: Remove this when the API is deployed
    return mockProcessUserPrompt()
  }

  try {
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/llm/personal`,
      {
        method: "POST",
        headers: {
          "key": commonConfig.PRIVATE_DATA_API_PRIVATE_KEY,
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
