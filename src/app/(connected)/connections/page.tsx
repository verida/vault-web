import { DataConnectionLogs } from "@/app/(connected)/connections/_components/data-connection-logs"
import { DataConnections } from "@/app/(connected)/connections/_components/data-connections"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

enum ConnectionTabs {
  Connections = "Connections",
  ConnectionLogs = "Connection Logs",
}

export default function ConnectionsPage() {
  return (
    <div className="flex flex-col pb-4 md:pb-6 xl:pb-8">
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
          <DataConnections />
        </TabsContent>
        <TabsContent value={ConnectionTabs.ConnectionLogs}>
          <DataConnectionLogs />
        </TabsContent>
      </Tabs>
    </div>
  )
}
ConnectionsPage.displayName = "ConnectionsPage"
