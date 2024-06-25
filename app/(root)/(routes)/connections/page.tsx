"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ConnectionCard } from "@/components/connection/connection-card";
import { ConnectionModal } from "@/components/connection/connection-modal";
import { Filter } from "@/components/icons/filter";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { connections } from "@/features/connections";
import { cn } from "@/lib/utils";

const MarketingPage = () => {
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

  return (
    <div className="flex flex-col py-10">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-2xl font-medium">Discover Connections</h1>
        <nav className="flex w-full space-x-3 md:w-auto">
          <SearchInput onValueChange={handleSearchInputChange} />
          <Button
            variant="secondary"
            size="lg"
            className="h-12 px-4 text-gray-500"
          >
            <Filter /> Filter
          </Button>
        </nav>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
