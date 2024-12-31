"use client"

import {
  DataConnectionCard,
  DataConnectionSkeletonCard,
} from "@/app/(connected)/connections/summary/_components/data-connection-card"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/components/ui/empty-state"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
} from "@/components/ui/error"
import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"
import { cn } from "@/styles/utils"

export type DataConnectionsListProps = React.ComponentProps<"div">

export function DataConnectionsList(props: DataConnectionsListProps) {
  const { className, ...divProps } = props

  const { connections, isLoading, isError } = useDataConnections()

  if (connections) {
    if (connections.length === 0) {
      return (
        <div className={className} {...divProps}>
          <EmptyState className="mb-8">
            <EmptyStateTitle variant="heading-5">
              No connections yet
            </EmptyStateTitle>
            <div className="flex flex-col items-center gap-2">
              <EmptyStateDescription>
                You have no active data connections at the moment.
              </EmptyStateDescription>
              <EmptyStateDescription>
                Connect a platform to start extracting your personal data.
              </EmptyStateDescription>
            </div>
          </EmptyState>
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
          <article key={connection._id}>
            <DataConnectionCard connection={connection} className="h-full" />
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
      <div className={className} {...divProps}>
        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockDescription>
            There was an error fetching your data connections. Please try again
            later.
          </ErrorBlockDescription>
        </ErrorBlock>
      </div>
    )
  }
}
DataConnectionsList.displayName = "DataConnectionsList"
