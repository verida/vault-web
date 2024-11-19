import { DATA_CONNECTIONS_SYNC_LOGS_DATABASE_NAME } from "@/features/data-connections/constants"
import { DataConnectionSyncLogBaseSchema } from "@/features/data-connections/schemas"
import { DataConnectionSyncLog } from "@/features/data-connections/types"
import { useVeridaDataRecords } from "@/features/verida-database/hooks/use-verida-data-records"
import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import { VeridaRecord } from "@/features/verida-database/types"

type UseDataConnectionsLogsArgs = {
  filter?: VeridaDatabaseQueryFilter<VeridaRecord<DataConnectionSyncLog>>
  options?: VeridaDatabaseQueryOptions<VeridaRecord<DataConnectionSyncLog>>
}

export function useDataConnectionsLogs({
  filter,
  options,
}: UseDataConnectionsLogsArgs) {
  const { records, pagination, ...query } = useVeridaDataRecords({
    databaseName: DATA_CONNECTIONS_SYNC_LOGS_DATABASE_NAME,
    filter,
    options: {
      ...options,
      sort: options?.sort ?? [
        {
          insertedAt: "desc",
        },
      ],
    },
    baseSchema: DataConnectionSyncLogBaseSchema,
  })

  return { logs: records, pagination, ...query }
}
