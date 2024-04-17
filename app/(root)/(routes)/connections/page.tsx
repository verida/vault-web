"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { connections } from "@/features/connections";
import { ConnectionCard } from "@/components/connection/connection-card";
import { ConnectionModal } from "@/components/connection/connection-modal";
import { useState } from "react";

const MarketingPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [connectionId, setConnectionId] = useState<string>("");

  const handleOpenConnectionModal = (id: string) => {
    setIsOpen(true);
    setConnectionId(id);
  };

  const handleCloseConnectionModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col p-10'>
      <h1 className='text-2xl font-medium mb-6'>Discover Connections</h1>
      <div className='grid grid-cols-3 gap-6'>
        {connections.map((connection) => (
          <ConnectionCard
            {...connection}
            key={connection.id}
            onConnect={() => handleOpenConnectionModal(connection.id)}
            isConnected={true}
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
