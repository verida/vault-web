import { SuggestedAiPromptInput } from "@/features/assistants/types"
import { DatabaseDefinition } from "@/features/data/types"

export const AI_ASSISTANTS_DB_DEF: DatabaseDefinition = {
  id: "ai-assistants",
  type: "technical",
  title: "AI Assistant",
  titlePlural: "AI Assistants",
  color: "#5BE1B0",
  databaseVaultName: "ai_assistant",
  schemaUrlBase: "https://common.schemas.verida.io/ai/assistant",
  schemaUrlLatest:
    "https://common.schemas.verida.io/ai/assistant/v0.1.0/schema.json",
}

export const AI_PROMPTS_DB_DEF: DatabaseDefinition = {
  id: "ai-prompts",
  type: "technical",
  title: "User Prompt",
  titlePlural: "User Prompts",
  color: "#5BE1B0",
  databaseVaultName: "ai_prompt",
  schemaUrlBase: "https://common.schemas.verida.io/ai/prompt",
  schemaUrlLatest:
    "https://common.schemas.verida.io/ai/prompt/v0.1.0/schema.json",
}

export const SUGGESTED_PROMPTS: SuggestedAiPromptInput[] = [
  {
    label: "What do I have to focus on today?",
    prompt:
      "You are a personal assistant. Create an agenda of what I need to focus on today by looking at my emails, calendar and messages.",
  },
  {
    label: "Summarize my latest emails",
    prompt:
      "Summarize the last 24 hours of emails and messages I have received",
  },
  {
    label: "Create an agenda for my upcoming meeting",
    prompt:
      "Summarize recent conversations and prepare a draft agenda for my upcoming meeting with from",
  },
  {
    label: "How much have I spent on amazon last month?",
    prompt: "How much have I spent on amazon last month?",
  },
]
