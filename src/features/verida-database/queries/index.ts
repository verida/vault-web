import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"

export const VeridaDatabaseQueryKeys = {
  dataRecords: <T = Record<string, unknown>>({
    databaseName,
    did,
    filter,
    options,
  }: {
    databaseName: string
    did: string | null
    filter?: VeridaDatabaseQueryFilter<T>
    options?: VeridaDatabaseQueryOptions<T>
  }) => ["data", "records", databaseName, did, filter, options],
  invalidateAllDataRecords: () => ["data", "records"],
  invalidateDataRecords: ({ databaseName }: { databaseName: string }) => [
    "data",
    "records",
    databaseName,
  ],
}
