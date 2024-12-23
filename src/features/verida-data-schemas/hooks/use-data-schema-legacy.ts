import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

import { DataSchema_Legacy } from "@/features/verida-data-schemas/types"

/**
 * @deprecated
 */
export const useDataSchema_legacy = (schemaUrl?: string) => {
  const fetchDataSchema = useCallback(async () => {
    if (!schemaUrl) return
    else {
      const res = await fetch(schemaUrl, { method: "GET" })
      if (!res.ok) {
        throw new Error("Failed to fetch schema")
      }
      const schema: DataSchema_Legacy = await res.json()
      schema.properties = (schema as any).allOf[1].properties
      return schema
    }
  }, [schemaUrl])

  const {
    data: dataSchema,
    isPending: isDataSchemaPending,
    isError: isDataSchemaError,
  } = useQuery({
    queryKey: ["data", "schema", schemaUrl],
    queryFn: fetchDataSchema,
  })

  if (!schemaUrl) {
    return {
      dataSchema: undefined,
      isDataSchemaPending: false,
      isDataSchemaError: false,
    }
  }

  return {
    dataSchema,
    isDataSchemaPending,
    isDataSchemaError,
  }
}
