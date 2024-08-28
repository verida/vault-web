import { EnvironmentType } from "@verida/types"
import { z } from "zod"

export const ClientConfigSchema = z.object({
  BASE_URL: z.string().url(),
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
  DEBUG_MODE: z
    .string()
    .optional()
    .transform((value) => (value === "true" ? true : false)),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  FEATURE_FLAG_AI_ASSISTANT_ENABLED: z
    .string()
    .optional()
    .transform((value) => (value === "true" ? true : false)),
  isClient: z.boolean(),
})

export const ServerConfigSchema = ClientConfigSchema.extend({
  // TODO: Add server specific env vars
})
