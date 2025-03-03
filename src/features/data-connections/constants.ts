import { DatabaseDefinition } from "@/features/data/types"

export const DEFAULT_DATA_PROVIDER_DESCRIPTION = `Connect your account to extract your data and store it into your Vault.`

export const DATA_CONNECTIONS_CHANNEL = "data-connections"

export const DATA_CONNECTIONS_LOGS_DB_DEF: DatabaseDefinition = {
  id: "data-connections-logs",
  type: "technical",
  title: "Data Connections Log",
  titlePlural: "Data Connections Logs",
  color: "#5BE1B0",
  databaseVaultName: "data_connections_sync_log",
  schemaUrlBase:
    "https://vault.schemas.verida.io/data-connections/activity-log",
  schemaUrlLatest:
    "https://vault.schemas.verida.io/data-connections/activity-log/v0.2.0/schema.json",
}
