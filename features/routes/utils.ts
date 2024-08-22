import { NEW_CHAT_ID } from "@/features/assistant/constants"

export function getRootPageRoute() {
  return `/`
}

export function getAssistantPageRoute() {
  return `/assistant`
}

export function getAsistantChatPageRoute({
  chatId: chatId,
}: {
  chatId: string
}) {
  return `/assistant/${chatId}`
}

export function getAssistantNewChatPageRoute() {
  return getAsistantChatPageRoute({
    chatId: NEW_CHAT_ID,
  })
}

export function getInboxPageRoute() {
  return `/inbox`
}

export function getDataPageRoute() {
  return `/data`
}

export function getDatabasePageRoute({ databaseId }: { databaseId: string }) {
  return `/data/${databaseId}`
}

export function getConectionsPageRoute() {
  return `/connections`
}
