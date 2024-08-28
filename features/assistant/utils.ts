import { DUMMY_ANSWERS } from "@/features/assistant/mock"

async function wait(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function processUserPrompt(prompt: string): Promise<string> {
  if (!prompt) {
    throw new Error("Prompt is required")
  }

  const answer = DUMMY_ANSWERS[Math.floor(Math.random() * DUMMY_ANSWERS.length)]
  const waitTime = Math.max(500, Math.min(5000, answer.length * 10))
  await wait(waitTime)

  return Promise.resolve(answer)
}
