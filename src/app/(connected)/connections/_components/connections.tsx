"use client"

import React, { useCallback } from "react"
import { useState } from "react"

import { ConnectConnectionDialog } from "@/app/(connected)/connections/_components/connect-connection-dialog"
import { ConnectionCard } from "@/app/(connected)/connections/_components/connection-card"
import { DisconnectConnectionDialog } from "@/app/(connected)/connections/_components/disconnect-connection-dialog"
import { Typography } from "@/components/typography"
// import { FilterButton } from "@/components/filter-button"
// import { SearchInput } from "@/components/search-input"
import { connections, myConnections } from "@/features/connections"

export function Connections() {
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false)
  const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false)
  const [connectionId, setConnectionId] = useState("")
  // const [searchKey, setSearchKey] = useState("")

  const handleOpenConnectDialog = useCallback((id: string) => {
    setConnectionId(id)
    setIsConnectDialogOpen(true)
  }, [])

  const handleCloseConnectDialog = useCallback(() => {
    setIsConnectDialogOpen(false)
  }, [])

  const handleOpenDisconnectDialog = useCallback((id: string) => {
    setConnectionId(id)
    setIsDisconnectDialogOpen(true)
  }, [])

  const handleCloseDisconnectDialog = useCallback(() => {
    setIsDisconnectDialogOpen(false)
  }, [])

  // const handleSearchInputChange = (value: string) => {
  //   setSearchKey(value)
  // }

  // const searchedConnections = useMemo(
  //   () =>
  //     connections.filter((c) =>
  //       c.id.toLocaleLowerCase().includes(searchKey.toLowerCase())
  //     ),
  //   [searchKey]
  // )

  return (
    <div>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <Typography variant={"heading-3"}>Connections</Typography>
        {/* <nav className="flex w-full space-x-3 md:w-auto">
          <SearchInput onValueChange={handleSearchInputChange} />
          <FilterButton />
        </nav> */}
      </div>

      {myConnections.length > 0 && (
        <div className="mt-6">
          <Typography variant={"heading-4"} className="mb-6">
            My Connections
          </Typography>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myConnections.map((connection) => (
              <ConnectionCard
                {...connection}
                key={connection.id}
                isConnected
                onDisconnect={() => handleOpenDisconnectDialog(connection.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        {myConnections.length > 0 && (
          <Typography variant={"heading-4"} className="mb-6">
            Popular Connections
          </Typography>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {connections.map((connection) => (
            <ConnectionCard
              {...connection}
              key={connection.id}
              onConnect={() => handleOpenConnectDialog(connection.id)}
            />
          ))}
        </div>
      </div>

      <ConnectConnectionDialog
        isOpen={isConnectDialogOpen}
        onClose={handleCloseConnectDialog}
        connectionId={connectionId}
      />
      <DisconnectConnectionDialog
        isOpen={isDisconnectDialogOpen}
        onClose={handleCloseDisconnectDialog}
        connectionId={connectionId}
      />
    </div>
  )
}
