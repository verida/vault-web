import { DATA_CONNECTIONS_SYNC_LOGS_DATABASE_NAME } from "@/features/data-connections/constants"
import { DataConnectionSyncLog } from "@/features/data-connections/types"
import { useVeridaDataRecords } from "@/features/verida-database"

export function useDataConnectionsLogs() {
  // TODO: Use a proper schema of the logs once supported by useVeridaDataRecords
  const { records, pagination, ...query } =
    useVeridaDataRecords<DataConnectionSyncLog>({
      databaseName: DATA_CONNECTIONS_SYNC_LOGS_DATABASE_NAME,
      options: {
        // TODO: Handle pagination
        // sort: [
        //   {
        //     insertedAt: "desc",
        //   },
        // ],
      },
    })

  return { logs: records, pagination, ...query }
}
