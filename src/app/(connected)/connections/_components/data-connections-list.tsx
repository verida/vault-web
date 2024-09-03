import { DataConnectionCard } from "@/app/(connected)/connections/_components/data-connection-card"
import { MOCK_USER_DATA_CONNECTIONS } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataConnectionsListProps = React.ComponentProps<"div">

export function DataConnectionsList(props: DataConnectionsListProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
        className
      )}
      {...divProps}
    >
      {MOCK_USER_DATA_CONNECTIONS.map((connection) => (
        <DataConnectionCard key={connection.name} connection={connection} />
      ))}
    </div>
  )
}
DataConnectionsList.displayName = "DataConnectionsList"
