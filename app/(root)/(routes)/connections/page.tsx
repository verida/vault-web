"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { connections } from "@/features/connections";
import { ConnectionCard } from "@/components/connection/connection-card";
import { ConnectionModal } from "@/components/connection/connection-modal";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "@/components/icons/filter";
import { SearchInput } from "@/components/search-input";
import { useVerida } from "@/features/verida";
import DataConnectorsManager from "@/lib/DataConnectorManager";

const MarketingPage = () => {
  const { webUserInstanceRef } = useVerida();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [connectionId, setConnectionId] = useState<string>("");
  const [searchKey, setSearchKey] = useState<string>("");

  const handleOpenConnectionModal = (id: string) => {
    setIsOpen(true);
    setConnectionId(id);
  };

  const handleCloseConnectionModal = () => {
    setIsOpen(false);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchKey(value);
  };

  const searchedConnections = useMemo(
    () =>
      connections.filter((c) =>
        c.id.toLocaleLowerCase().includes(searchKey.toLowerCase())
      ),
    [searchKey]
  );

  // Example showing how `DataConnectorsManager` works
  React.useEffect(() => {
    const init = async () => {
      console.log("Connection page init");
      const context = webUserInstanceRef.current?.getContext();
      const dcm = new DataConnectorsManager(
        context,
        webUserInstanceRef.current.getDid()
      );

      // Get all the available connections
      const connections = await dcm.getConnections();
      console.log(connections);

      const discordConnection = await dcm.getConnection("discord");
      const discordConnectUrl = await discordConnection.getConnectUrl();

      console.log("Discord connect URL:", discordConnectUrl);
    };

    init();
  }, [webUserInstanceRef]);
  // End Example

  return (
    <div className='flex flex-col py-10'>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <h1 className='text-2xl font-medium'>Discover Connections</h1>
        <nav className='flex space-x-3 w-full md:w-auto'>
          <SearchInput onValueChange={handleSearchInputChange} />
          <Button
            variant='outline'
            size='lg'
            className='text-gray-500 h-12 px-4'
          >
            <Filter /> Filter
          </Button>
        </nav>
      </div>

      <div className='grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3'>
        {searchedConnections.map((connection) => (
          <ConnectionCard
            {...connection}
            key={connection.id}
            onConnect={() => handleOpenConnectionModal(connection.id)}
          />
        ))}
      </div>

      <ConnectionModal
        isOpen={isOpen}
        onClose={handleCloseConnectionModal}
        connectionId={connectionId}
      />
    </div>
  );
};

export default MarketingPage;
