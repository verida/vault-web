"use client"

import {
  DataProviderCard,
  DataProviderSkeletonCard,
} from "@/app/(connected)/connections/_components/data-provider-card"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
        <Typography variant="base-regular">
          There are no available connections at the moment.
        </Typography>
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
          <DataProviderCard key={provider.name} provider={provider} />
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
      // TODO: Improve the design of the error state
      <Alert variant="error">
        <AlertDescription>
          There has been an error getting the available connections. Please try
          again later.
        </AlertDescription>
      </Alert>
    )
  }
}
DataProvidersList.displayName = "DataProvidersList"
