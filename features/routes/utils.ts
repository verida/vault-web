export function getRootPageRoute() {
  return `/`
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

export function getConectionsPageRoute() {
  return `/connections`
}
