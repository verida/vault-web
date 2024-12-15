export function getRootPageRoute() {
  return `/`
}

export function getDefaultRedirectPathAfterConnection() {
  return getAssistantsPageRoute()
}

export function getAssistantsPageRoute() {
  return `/assistants`
}

export function getAssistantPageRoute({
  assistantId,
  fromDeletion,
}: {
  assistantId: string
  fromDeletion?: boolean
}) {
  return `/assistants/${assistantId}${fromDeletion ? "?fromDeletion=true" : ""}`
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

export function getDatabaseItemPageRoute({
  databaseId,
  itemId,
}: {
  databaseId: string
  itemId: string
}) {
  return `/data/${databaseId}?itemId=${itemId}`
}

export function getConnectionsPageRoute() {
  return `/connections`
}

export function getConnectionPageRoute({
  connectionId,
}: {
  connectionId: string
}) {
  return `/connections/${connectionId}`
}

export function getConnectionsSummaryPageRoute() {
  return `/connections/summary`
}

export function getConnectionsSummaryLogsPageRoute() {
  return `/connections/summary/logs`
}

export function getNewDataConnectionCallbackPageRoute() {
  return `/callback/new-data-connection`
}

export function getAuthorizedAppsPageRoute() {
  return `/authorizations`
}
