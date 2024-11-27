import {
  AiAssistantRecord,
  AiPromptRecord,
  LLMModelDefinition,
  LlmModel,
} from "@/features/assistants/types"
import { DatabaseDefinition } from "@/features/data/types"

export const LLM_MODEL_DEFS: Record<LlmModel, LLMModelDefinition> = {
  "LLAMA3.2_3B": {
    provider: "bedrock",
    model: "LLAMA3.2_3B",
    label: "Llama 3.2 3B",
  },
  "LLAMA3.2_1B": {
    provider: "bedrock",
    model: "LLAMA3.2_1B",
    label: "Llama 3.2 1B",
  },
  "LLAMA3.1_70B": {
    provider: "bedrock",
    model: "LLAMA3.1_70B",
    label: "Llama 3.1 70B",
  },
  "LLAMA3.1_8B": {
    provider: "bedrock",
    model: "LLAMA3.1_8B",
    label: "Llama 3.1 8B",
  },
  "LLAMA3_70B": {
    provider: "bedrock",
    model: "LLAMA3_70B",
    label: "Llama 3 70B",
  },
  "LLAMA3_8B": {
    provider: "bedrock",
    model: "LLAMA3_8B",
    label: "Llama 3 8B",
  },
  "MIXTRAL_8_7B": {
    provider: "bedrock",
    model: "MIXTRAL_8_7B",
    label: "Mixtral 8 7B",
  },
  "MIXTRAL_SMALL": {
    provider: "bedrock",
    model: "MIXTRAL_SMALL",
    label: "Mixtral Small",
  },
  "MIXTRAL_LARGE": {
    provider: "bedrock",
    model: "MIXTRAL_LARGE",
    label: "Mixtral Large",
  },
}

export const MAX_NB_ASSISTANTS = 5
export const MAX_NB_PROMPTS_PER_ASSISTANT = 20

export const DEFAULT_ASSISTANT_ORDER = 100
export const DEFAULT_PROMPT_ORDER = 100

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

export const DEFAULT_ASSISTANT: AiAssistantRecord = {
  _id: "new",
  name: "Kyra",
}

export const SUGGESTED_PROMPTS: AiPromptRecord[] = [
  {
    _id: "1",
    assistantId: "new",
    name: "What do I have to focus on today?",
    prompt:
      "You are a personal assistant. Create an agenda of what I need to focus on today by looking at my emails, calendar and messages.",
  },
  {
    _id: "2",
    assistantId: "new",
    name: "Summarize my latest emails",
    prompt:
      "Summarize the last 24 hours of emails and messages I have received",
  },
  {
    _id: "3",
    assistantId: "new",
    name: "Create an agenda for my upcoming meeting",
    prompt:
      "Summarize recent conversations and prepare a draft agenda for my upcoming meeting with from",
  },
  {
    _id: "4",
    assistantId: "new",
    name: "How much have I spent on amazon last month?",
    prompt: "How much have I spent on amazon last month?",
  },
]
