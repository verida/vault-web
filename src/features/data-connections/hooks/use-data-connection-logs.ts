import { useDataConnectionsLogs } from "@/features/data-connections/hooks/use-data-connections-logs"
import type { DataConnectionSyncLog } from "@/features/data-connections/types"
import type {
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
