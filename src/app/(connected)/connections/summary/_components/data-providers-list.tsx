"use client"

import {
  DataProviderCard,
  DataProviderSkeletonCard,
} from "@/app/(connected)/connections/summary/_components/data-provider-card"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
} from "@/components/ui/empty-state"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
} from "@/components/ui/error"
import { DataProvider } from "@/features/data-connections/types"
import { cn } from "@/styles/utils"

export type DataProvidersListProps = {
  providers: DataProvider[] | undefined
  isLoading: boolean
  isError: boolean
} & React.ComponentProps<"div">

export function DataProvidersList(props: DataProvidersListProps) {
  const { providers, isLoading, isError, className, ...divProps } = props

  if (providers) {
    if (providers.length === 0) {
      return (
        <div className={className} {...divProps}>
          <EmptyState>
            <EmptyStateImage />
            <EmptyStateDescription>
              There are no platform at the moment. Come back later.
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
            <DataProviderCard provider={provider} className="h-full" />
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
