import { lorem } from "@/features/assistant/mock"

async function wait(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function processUserPrompt(prompt: string): Promise<string> {
  if (!prompt) {
    throw new Error("Prompt is required")
  }

  await wait()

  return Promise.resolve(lorem[Math.floor(Math.random() * lorem.length)])
}
