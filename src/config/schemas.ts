import { Network } from "@verida/types"
import { z } from "zod"

import { LLM_MODELS, LLM_PROVIDERS } from "@/features/assistants/schemas"

export const CommonConfigSchema = z.object({
  BASE_URL: z.string().url(),
  DEV_MODE: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  PLAUSIBLE_DOMAIN: z.string().optional(),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  SENTRY_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_RESTRICTED_ACCESS_DISABLED: z
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
          ? Network.BANKSIA
          : value === "devnet"
            ? Network.DEVNET
            : value === "local"
              ? Network.LOCAL
              : Network.BANKSIA
    }),
  VERIDA_RPC_URL: z
    .union([z.string().url(), z.literal("")])
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  PRIVATE_DATA_API_BASE_URL: z.string().url(),
  FEATURE_FLAG_VERIDA_AUTH_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_AUTHORIZED_APPS_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_AI_ASSISTANT_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_AI_ASSISTANT_USER_PROMPTS_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  FEATURE_FLAG_AI_ASSISTANT_PROMPT_CONFIG_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  DEFAULT_AI_PROVIDER: z.enum(LLM_PROVIDERS).default("bedrock"),
  DEFAULT_AI_MODEL: z.enum(LLM_MODELS).default("LLAMA3.1_70B"),
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
  FEATURE_FLAG_DATA_DISPLAY_TECHNICAL_DATABASES: z
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
  FEATURE_FLAG_REQUESTS_ENABLED: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  isClient: z.boolean(),
  appVersion: z.string(),
})

export const ServerConfigSchema = z.object({
  // ... any other server-specific properties
})
