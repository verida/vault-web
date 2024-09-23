import { DATA_CONNECTIONS_SYNC_LOGS_DATABASE_NAME } from "@/features/data-connections/constants"
import { DataConnectionSyncLog } from "@/features/data-connections/types"
import { useVeridaDataRecords } from "@/features/verida-database"

export function useDataConnectionLogs({
  providerId,
  accountId,
}: {
  providerId: string
  accountId: string
}) {
  // TODO: Use a proper schema of the logs once supported by useVeridaDataRecords
  const { records, pagination, ...query } =
    useVeridaDataRecords<DataConnectionSyncLog>({
      databaseName: DATA_CONNECTIONS_SYNC_LOGS_DATABASE_NAME,
      filter: {
        providerName: providerId,
        providerId: accountId,
      },
      options: {
        // TODO: Handle pagination
        limit: 4,
        // sort: [
        //   {
        //     insertedAt: "desc",
        //   },
        // ],
      },
    })

  return { logs: records, pagination, ...query }
}
