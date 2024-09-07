import { EnvironmentType } from "@verida/types"
import { z } from "zod"

export const CommonConfigSchema = z.object({
  BASE_URL: z.string().url(),
  DEV_MODE: z
    .string()
    .optional()
    .transform((value) => (value === "true" ? true : false)),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  VERIDA_NETWORK: z
    .enum(["mainnet", "testnet", "devnet", "local"])
    .default("testnet")
    .transform((value) => {
      return value === "mainnet"
        ? EnvironmentType.MAINNET
        : value === "devnet"
          ? EnvironmentType.DEVNET
          : value === "local"
            ? EnvironmentType.LOCAL
            : EnvironmentType.TESTNET
    }),
  VERIDA_RPC_URL: z.string().url().optional(),
  FEATURE_FLAG_AI_ASSISTANT_ENABLED: z
    .string()
    .optional()
    .transform((value) => (value === "true" ? true : false)),
  FEATURE_FLAG_DATA_CONNECTIONS_ENABLED: z
    .string()
    .optional()
    .transform((value) => (value === "true" ? true : false)),
  FEATURE_FLAG_DATA_CONNECTIONS_LOGS_ENABLED: z
    .string()
    .optional()
    .transform((value) => (value === "true" ? true : false)),
  PRIVATE_DATA_API_BASE_URL: z.string().url().optional(), // Temporary solution until the endpoints are fetched from the DID Document
  PRIVATE_DATA_API_PRIVATE_KEY: z.string().optional(), // Temporary solution until we have a proper auth solution on the backend
  isClient: z.boolean(),
})

export const ServerConfigSchema = z.object({
  // TODO: Add server specific configuration properties here
})
