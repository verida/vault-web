"use client"

import { useSearchParams } from "next/navigation"

import { ConnectionDetails } from "@/app/(connected)/connections/_components/connection-details"
import { ConnectionLogs } from "@/app/(connected)/connections/_components/connection-logs"
import { Connections } from "@/app/(connected)/connections/_components/connections"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { myConnections } from "@/features/connections"

enum ConnectionTabs {
  Connections = "Connections",
  ConnectionLogs = "Connection Logs",
}

export default function ConnectionsPage() {
  const searchParams = useSearchParams()
  const connectionId = searchParams.get("id")
  const connection = myConnections.find((c) => c.id === connectionId)

  if (connectionId && connection) {
    return <ConnectionDetails connection={connection} />
  }

  return (
    <div className="flex flex-col pb-10">
      <Tabs defaultValue={ConnectionTabs.Connections}>
        <TabsList>
          <TabsTrigger value={ConnectionTabs.Connections}>
            {ConnectionTabs.Connections}
          </TabsTrigger>
          <TabsTrigger value={ConnectionTabs.ConnectionLogs}>
            {ConnectionTabs.ConnectionLogs}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={ConnectionTabs.Connections}>
          <Connections />
        </TabsContent>
        <TabsContent value={ConnectionTabs.ConnectionLogs}>
          <ConnectionLogs />
        </TabsContent>
      </Tabs>
    </div>
  )
}
