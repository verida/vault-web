"use client"

import {
  DataProviderCard,
  DataProviderSkeletonCard,
} from "@/app/(connected)/connections/summary/_components/data-provider-card"
import { Typography } from "@/components/typography"
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
        // TODO: Improve the design of the empty state
        <div className={className} {...divProps}>
          <Typography variant="base-regular">
            There are no available connections at the moment.
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
        {providers.map((provider) => (
          <article key={provider.name}>
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
        {[1, 2, 3].map((index) => (
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
