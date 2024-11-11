import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"

export const VeridaDatabaseQueryKeys = {
  dataRecords: <T = Record<string, unknown>>({
    did,
    databaseName,
    filter,
    options,
  }: {
    did: string | null
    databaseName: string
    filter?: VeridaDatabaseQueryFilter<T>
    options?: VeridaDatabaseQueryOptions<T>
  }) => ["data", "records", databaseName, did, filter, options],
  invalidateAllDataRecords: () => ["data", "records"],
  invalidateDataRecords: ({ databaseName }: { databaseName: string }) => [
    "data",
    "records",
    databaseName,
  ],
  dataRecord: ({
    did,
    databaseName,
    recordId,
  }: {
    did: string | null
    databaseName: string
    recordId: string
  }) => ["data", "record", databaseName, did, recordId],
  invalidateDataRecord: ({ databaseName }: { databaseName: string }) => [
    "data",
    "record",
    databaseName,
  ],
}
