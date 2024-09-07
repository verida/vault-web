"use client"

import {
  DataConnectionCard,
  DataConnectionSkeletonCard,
} from "@/app/(connected)/connections/summary/_components/data-connection-card"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDataConnections } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataConnectionsListProps = React.ComponentProps<"div">

export function DataConnectionsList(props: DataConnectionsListProps) {
  const { className, ...divProps } = props

  const { connections, isLoading, isError } = useDataConnections()

  if (connections) {
    if (connections.length === 0) {
      return (
        // TODO: Improve the design of the empty state
        <div className={className} {...divProps}>
          <Typography variant="base-regular">
            You have no active data connections at the moment.
          </Typography>
        </div>
      )
    }

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
          className
        )}
        {...divProps}
      >
        {connections.map((connection) => (
          <article key={connection.name}>
            <DataConnectionCard connection={connection} />
          </article>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
          className
        )}
        {...divProps}
      >
        <DataConnectionSkeletonCard />
      </div>
    )
  }

  if (isError) {
    return (
      // TODO: Improve the design of the error state
      <div className={className} {...divProps}>
        <Alert variant="error">
          <AlertDescription>
            There has been an error fetching your data connections. Please try
            again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
}
DataConnectionsList.displayName = "DataConnectionsList"
