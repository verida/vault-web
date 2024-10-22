export function getRootPageRoute() {
  return `/`
}

export function getDefaultRedirectPathAfterConnection() {
  return getAssistantPageRoute()
}

export function getAssistantPageRoute() {
  return `/assistant`
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

export function getApiKeysPageRoute() {
  return `/api-keys`
}
