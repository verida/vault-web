import React from "react"

import { DataConnectionCard } from "@/app/(connected)/connections/_components/data-connection-card"
import { DataProviderCard } from "@/app/(connected)/connections/_components/data-provider-card"
import { Typography } from "@/components/typography"
import {
  MOCK_DATA_PROVIDERS,
  MOCK_USER_DATA_CONNECTIONS,
} from "@/features/data-connections"

export function DataConnections() {
  return (
    <div>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <Typography variant="heading-3">Connections</Typography>
      </div>

      {MOCK_USER_DATA_CONNECTIONS.length > 0 && (
        <div className="mt-6">
          <Typography variant="heading-4" className="mb-6">
            My Connections
          </Typography>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_USER_DATA_CONNECTIONS.map((connection) => (
              <DataConnectionCard
                connection={connection}
                key={connection.name}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        {MOCK_USER_DATA_CONNECTIONS.length > 0 && (
          <Typography variant="heading-4" className="mb-6">
            Popular Connections
          </Typography>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_DATA_PROVIDERS.map((provider) => (
            <DataProviderCard provider={provider} key={provider.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
DataConnections.displayName = "DataConnections"
