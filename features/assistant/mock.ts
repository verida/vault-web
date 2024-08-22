import { AssistantChat } from "@/features/assistant/types"

export const mockChat: AssistantChat = {
  id: "mock-chat-id",
  messages: [
    {
      sender: "user",
      content: "Where did I buy this green chair?",
    },
    {
      sender: "assistant",
      content:
        "You bought the green chair on May 15, 2023. It was purchased from HomeGoods during their spring sale. You used your credit card ending in 1234, and the total cost was $125.99.",
    },
    {
      sender: "user",
      content: "How much tax will I pay this year?",
    },
    {
      sender: "assistant",
      content:
        "Based on your financial records and income from last year, you are projected to pay approximately $15,000 in taxes this year. This estimation takes into account your income sources, deductions, and current tax rates.",
    },
  ],
}

export const lorem = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
]
