import { DataConnectionHandlerCard } from "@/app/(connected)/connections/[connectionId]/_components/data-connection-handler-card"
import { MOCK_SUPPORTED_DATA } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataConnectionsHandlersListProps = React.ComponentProps<"div">

export function DataConnectionsHandlersList(
  props: DataConnectionsHandlersListProps
) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
      {...divProps}
    >
      {MOCK_SUPPORTED_DATA.map((data, index) => (
        <article key={index}>
          <DataConnectionHandlerCard data={data} />
        </article>
      ))}
    </div>
  )
}
DataConnectionsHandlersList.displayName = "DataConnectionsHandlersList"
