import { SuggestedInput } from "@/features/assistants/types"

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
