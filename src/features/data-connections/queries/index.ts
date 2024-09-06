export const DataConnectionsQueryKeys = {
  dataConnections: ({ did }: { did: string | null }) => [
    did,
    "data-connections",
    "connections",
  ],
  invalidateDataConnections: () => ["data-connections", "connections"],
  dataProviders: () => ["data-connections", "providers"],
  invalidateDataProviders: () => ["data-connections", "providers"],
}
