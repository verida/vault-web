import { useMemo } from "react"

import { useDataProviders } from "@/features/data-connections/hooks/use-data-providers"

export function useDataProvider(providerId: string) {
  const { providers, ...query } = useDataProviders()

  const provider = useMemo(
    () => providers?.find((provider) => provider.name === providerId),
    [providers, providerId]
  )

  return {
    provider,
    ...query,
  }
}
