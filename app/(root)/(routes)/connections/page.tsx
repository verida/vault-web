"use client";

import { ConnectionCard } from "@/components/connection/connection-card";
import { ConnectionModal } from "@/components/connection/connection-modal";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "@/components/icons/filter";
import { SearchInput } from "@/components/search-input";
import { useConnect } from "@/hooks/useConnect";
import { useSearchParams } from "next/navigation";
import { useConnectionAuthParams } from "@/hooks/useConnectionAuthParams";

const MarketingPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [connectionId, setConnectionId] = useState<string>("");
  const [searchKey, setSearchKey] = useState<string>("");
  const { provider, authParams } = useConnectionAuthParams();
  const { connections, connect, connectLoading } = useConnect({
    provider,
    authParams,
  });
  const handleOpenConnectionModal = (id: string) => {
    setIsOpen(true);
    setConnectionId(id);
  };

  const handleCloseConnectionModal = () => setIsOpen(false);

  const handleSearchInputChange = (value: string) => setSearchKey(value);

  const searchedConnections = useMemo(
    () =>
      connections.filter((c) =>
        c.name.toLocaleLowerCase().includes(searchKey.toLowerCase())
      ),
    [searchKey, connections]
  );

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
            key={connection.name}
            onConnect={() => handleOpenConnectionModal(connection.name)}
          />
        ))}
      </div>

      <ConnectionModal
        isOpen={isOpen}
        connectionId={connectionId}
        connectLoading={connectLoading}
        onClose={handleCloseConnectionModal}
        onConnect={() => connect(connectionId)}
      />
    </div>
  );
};

export default MarketingPage;
