import { DATA_CONNECTIONS_LOGS_DB_DEF } from "@/features/data-connections/constants"
import { DataConnectionSyncLogBaseSchema } from "@/features/data-connections/schemas"
import {
  UseVeridaDataRecordsArgs,
  useVeridaDataRecords,
} from "@/features/verida-database/hooks/use-verida-data-records"

type UseDataConnectionsLogsArgs = Pick<
  UseVeridaDataRecordsArgs<typeof DataConnectionSyncLogBaseSchema>,
  "filter" | "options"
>

export function useDataConnectionsLogs({
  filter,
  options,
}: UseDataConnectionsLogsArgs = {}) {
  const { records, pagination, ...query } = useVeridaDataRecords({
    databaseName: DATA_CONNECTIONS_LOGS_DB_DEF.databaseVaultName,
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
