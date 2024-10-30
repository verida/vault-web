import { RecommendedPrompt } from "@/features/assistant/types"

export const RECOMMENDED_PROMPTS_FOR_NEW_CHAT: RecommendedPrompt[] = [
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
