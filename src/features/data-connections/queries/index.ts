const CONNECTIONS_KEY = "data-connections"
const CONNECTION_KEY = "connections"
const PROVIDERS_KEY = "providers"

export const DataConnectionsQueryKeys = {
  dataConnections: ({ did }: { did: string | null }) => [
    CONNECTIONS_KEY,
    did,
    CONNECTION_KEY,
  ],
  invalidateDataConnections: () => [CONNECTIONS_KEY, CONNECTION_KEY],
  dataProviders: () => [CONNECTIONS_KEY, PROVIDERS_KEY],
  invalidateDataProviders: () => [CONNECTIONS_KEY, PROVIDERS_KEY],
}
