"use client"

import { type ComponentProps, useMemo } from "react"

import { DataProvidersList } from "@/app/(connected)/connections/summary/_components/data-providers-list"
import { SummarySectionWrapper } from "@/app/(connected)/connections/summary/_components/summary-section-wrapper"
import { useDataProviders } from "@/features/data-connections/hooks/use-data-providers"
import type { DataProviderStatus } from "@/features/data-connections/types"

export interface DataProvidersSectionProps
  extends Omit<ComponentProps<typeof SummarySectionWrapper>, "children"> {
  hideIfLoading?: boolean
  hideIfEmpty?: boolean
  hideIfError?: boolean
  filteredStatus: DataProviderStatus
}

export function DataProvidersSection(props: DataProvidersSectionProps) {
  const {
    filteredStatus,
    hideIfLoading,
    hideIfEmpty,
    hideIfError,
    ...sectionProps
  } = props

  const { providers, isLoading, isError } = useDataProviders()

  const filteredProviders = useMemo(
    () => providers?.filter((provider) => provider.status === filteredStatus),
    [providers, filteredStatus]
  )

  if (hideIfLoading && isLoading) {
    return null
  }

  if (hideIfEmpty && filteredProviders?.length === 0) {
    return null
  }

  if (hideIfError && isError) {
    return null
  }

  return (
    <SummarySectionWrapper {...sectionProps}>
      <DataProvidersList
        providers={filteredProviders}
        isLoading={isLoading}
        isError={isError}
      />
    </SummarySectionWrapper>
  )
}
DataProvidersSection.displayName = "DataProvidersSection"
