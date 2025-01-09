import { useQuery } from "@tanstack/react-query"

import { fetchJsonDataSchema } from "@/features/verida-data-schemas/utils"

export function useDataSchema(schemaUrl?: string) {
  const { data, ...query } = useQuery({
    enabled: !!schemaUrl,
    queryKey: ["data-schema", schemaUrl],
    queryFn: () => {
      if (!schemaUrl) {
        throw new Error("Schema URL is required")
      }

      return fetchJsonDataSchema(schemaUrl)
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    meta: {
      persist: true,
      logCategory: "verida-data-schemas",
      errorMessage: "Failed to fetch JSON schema",
    },
  })

  return {
    dataSchema: data,
    ...query,
  }
}
