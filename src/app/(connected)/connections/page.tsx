import { ConnectionLogs } from "@/app/(connected)/connections/_components/connection-logs"
import { Connections } from "@/app/(connected)/connections/_components/connections"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

enum ConnectionTabs {
  Connections = "Connections",
  ConnectionLogs = "Connection Logs",
}

export default function ConnectionsPage() {
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
