import { useDataConnectionsLogs } from "@/features/data-connections/hooks/use-data-connections-logs"
import { DataConnectionSyncLog } from "@/features/data-connections/types"
import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
  VeridaRecord,
} from "@/features/verida-database/types"

type UseDataConnectionLogsArgs = {
  providerId: string
  accountId: string
  filter?: VeridaDatabaseQueryFilter<VeridaRecord<DataConnectionSyncLog>>
  options?: VeridaDatabaseQueryOptions<VeridaRecord<DataConnectionSyncLog>>
}

export function useDataConnectionLogs({
  providerId,
  accountId,
  filter,
  options,
}: UseDataConnectionLogsArgs) {
  return useDataConnectionsLogs({
    filter: {
      ...filter,
      providerId,
      accountId,
    },
    options,
  })
}
