import { SuggestedInput } from "@/features/assistants/types"
import { DatabaseDefinition } from "@/features/data/types"

export const SAVED_PROMPTS_DB_DEF: DatabaseDefinition = {
  id: "saved-prompts",
  title: "User Prompt",
  titlePlural: "User Prompts",
  color: "#5BE1B0",
  databaseVaultName: "prompts",
  schemaUrlBase: "http://localhost:3000/schemas/assistant/prompt",
  schemaUrlLatest:
    // TODO: update this to the deployed version
    "http://localhost:3000/schemas/assistant/prompt/v0.1.0/schema.json",
}

export const DEFAULT_LLM_PROVIDER = "groq"

export const DEFAULT_LLM_MODEL = "LLAMA31_70B"

export const SUGGESTED_INPUTS: SuggestedInput[] = [
  {
    label: "What do I have to focus on today?",
    input: {
      prompt:
        "You are a personal assistant. Create an agenda of what I need to focus on today by looking at my emails, calendar and messages.",
    },
  },
  {
    label: "Summarize my latest emails",
    input: {
      prompt:
        "Summarize the last 24 hours of emails and messages I have received",
    },
  },
  {
    label: "Create an agenda for my upcoming meeting",
    input: {
      prompt:
        "Summarize recent conversations and prepare a draft agenda for my upcoming meeting with from",
    },
  },
  {
    label: "How much have I spent on amazon last month?",
    input: {
      prompt: "How much have I spent on amazon last month?",
    },
  },
]
