"use client"

import React, { useCallback } from "react"
import { useState } from "react"

import {
  ActiveConnectionCard,
  AvailableProviderCard,
} from "@/app/(connected)/connections/_components/connection-card"
import { DisconnectConnectionDialog } from "@/app/(connected)/connections/_components/disconnect-connection-dialog"
import { Typography } from "@/components/typography"
import { MOCK_PROVIDERS, MOCK_USER_CONNECTIONS } from "@/features/connections"

export function Connections() {
  const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false)
  const [connectionId, setConnectionId] = useState("")

  const handleOpenDisconnectDialog = useCallback((id: string) => {
    setConnectionId(id)
    setIsDisconnectDialogOpen(true)
  }, [])

  const handleCloseDisconnectDialog = useCallback(() => {
    setIsDisconnectDialogOpen(false)
  }, [])

  return (
    <div>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <Typography variant="heading-3">Connections</Typography>
      </div>

      {MOCK_USER_CONNECTIONS.length > 0 && (
        <div className="mt-6">
          <Typography variant={"heading-4"} className="mb-6">
            My Connections
          </Typography>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_USER_CONNECTIONS.map((connection) => (
              <ActiveConnectionCard
                connection={connection}
                key={connection.name}
                onDisconnect={() => handleOpenDisconnectDialog(connection.name)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        {MOCK_USER_CONNECTIONS.length > 0 && (
          <Typography variant={"heading-4"} className="mb-6">
            Popular Connections
          </Typography>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROVIDERS.map((provider) => (
            <AvailableProviderCard provider={provider} key={provider.name} />
          ))}
        </div>
      </div>

      <DisconnectConnectionDialog
        isOpen={isDisconnectDialogOpen}
        onClose={handleCloseDisconnectDialog}
        connectionId={connectionId}
      />
    </div>
  )
}
