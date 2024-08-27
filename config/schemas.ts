import { EnvironmentType } from "@verida/types"
import { z } from "zod"

export const ClientEnvVarsSchema = z
  .object({
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_VERIDA_NETWORK: z
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
    NEXT_PUBLIC_VERIDA_RPC_URL: z.string().url().optional(),
    NEXT_PUBLIC_DEBUG_MODE: z
      .string()
      .optional()
      .transform((value) => (value === "true" ? true : false)),
    NEXT_PUBLIC_LOG_LEVEL: z
      .enum(["error", "warn", "info", "debug"])
      .default("info"),
    NEXT_PUBLIC_FEATURE_FLAG_AI_ASSISTANT_ENABLED: z
      .string()
      .optional()
      .transform((value) => (value === "true" ? true : false)),
  })
  .passthrough()

export const ServerEnvVarsSchema = ClientEnvVarsSchema.extend({
  // TODO: Add server specific env vars
}).passthrough()
