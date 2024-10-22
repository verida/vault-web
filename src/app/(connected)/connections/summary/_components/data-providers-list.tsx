"use client"

import {
  DataProviderCard,
  DataProviderSkeletonCard,
} from "@/app/(connected)/connections/summary/_components/data-provider-card"
import { EmptyState, EmptyStateDescription } from "@/components/ui/empty-state"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
} from "@/components/ui/error"
import { useDataProviders } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataProvidersListProps = React.ComponentProps<"div">

export function DataProvidersList(props: DataProvidersListProps) {
  const { className, ...divProps } = props

  const { providers, isLoading, isError } = useDataProviders()

  if (providers) {
    if (providers.length === 0) {
      return (
        <div className={className} {...divProps}>
          <EmptyState>
            <EmptyStateDescription>
              There are no available platform at the moment. Come back later.
            </EmptyStateDescription>
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
        {providers.map((provider) => (
          <article key={provider.id}>
            <DataProviderCard provider={provider} />
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
        {[...Array(3)].map((_, index) => (
          <DataProviderSkeletonCard key={index} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className={className} {...divProps}>
        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockDescription>
            There was an error getting the available connections. Please try
            again later.
          </ErrorBlockDescription>
        </ErrorBlock>
      </div>
    )
  }
}
DataProvidersList.displayName = "DataProvidersList"
