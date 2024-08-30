"use client"

import React from "react"
import { useState } from "react"

import { ConnectionCard } from "@/components/connection/connection-card"
import { ConnectionModal } from "@/components/connection/connection-modal"
import { FilterButton } from "@/components/filter-button"
import { SearchInput } from "@/components/search-input"
import { connections, myConnections } from "@/features/connections"

import { Typography } from "../typography"
import { DisconnectModal } from "./disconnect-modal"

const Connections = () => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false)
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] =
    useState<boolean>(false)

  const [connectionId, setConnectionId] = useState<string>("")
  const [searchKey, setSearchKey] = useState<string>("")

  const handleOpenConnectionModal = (id: string) => {
    setIsConnectModalOpen(true)
    setConnectionId(id)
  }

  const handleCloseConnectionModal = () => {
    setIsConnectModalOpen(false)
  }

  const handleCloseDisconnectModal = () => {
    setIsDisconnectModalOpen(false)
  }

  const handleSearchInputChange = (value: string) => {
    setSearchKey(value)
  }

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
        <nav className="flex w-full space-x-3 md:w-auto">
          <SearchInput onValueChange={handleSearchInputChange} />
          <FilterButton />
        </nav>
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
                onDisconnect={() => setIsDisconnectModalOpen(true)}
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
              onConnect={() => handleOpenConnectionModal(connection.id)}
            />
          ))}
        </div>
      </div>

      <ConnectionModal
        isOpen={isConnectModalOpen}
        onClose={handleCloseConnectionModal}
        connectionId={connectionId}
      />
      <DisconnectModal
        isOpen={isDisconnectModalOpen}
        onClose={handleCloseDisconnectModal}
        connectionId={connectionId}
      />
    </div>
  )
}

export default Connections
