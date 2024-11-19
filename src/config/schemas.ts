import { Network } from "@verida/types"
import { z } from "zod"

export const CommonConfigSchema = z.object({
  BASE_URL: z.string().url(),
  DEV_MODE: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  SENTRY_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  VERIDA_NETWORK: z
    .enum(["myrtle", "banksia", "devnet", "local"])
    .default("banksia")
    .transform((value) => {
      return value === "myrtle"
        ? Network.MYRTLE
        : value === "banksia"
          ? Network.DEVNET
          : value === "local"
            ? Network.LOCAL
            : Network.BANKSIA
    }),
  VERIDA_RPC_URL: z.string().url().optional(),
  FEATURE_FLAG_AI_ASSISTANT_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  DEFAULT_AI_PROVIDER: z.enum(["bedrock", "groq"]).default("groq"),
  DEFAULT_AI_MODEL: z
    .enum(["LLAMA3_70B", "LLAMA31_70B", "LLAMA3_8B", "MIXTRAL_8_7B"])
    .default("LLAMA31_70B"),
  FEATURE_FLAG_INBOX_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_DATA_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_DATA_DESTROY_DB_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_DATA_DELETE_RECORD_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_COMMAND_DIALOG_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_DATA_CONNECTIONS_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_DATA_CONNECTIONS_LOGS_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_DATA_CONNECTIONS_LOGS_DESTROY_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_API_KEYS_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  PRIVATE_DATA_API_BASE_URL: z.string().url().optional(), // Temporary solution until the endpoints are fetched from the DID Document
  isClient: z.boolean(),
  appVersion: z.string(),
})

export const ServerConfigSchema = z.object({
  NOTION_API_KEY: z.string(),
  NOTION_RESTRICTED_ACCESS_DATABASE_ID: z.string(),
  // ... any other server-specific properties
})
