import { CommonConfigSchema } from "@/config/schemas"
import { version } from "@/config/version"

const commonConfigCheckResult = CommonConfigSchema.safeParse({
  // Have to pass the variables one-by-one on the client because they are set
  // and replaced at build time only if they are explicitly used somewhere in
  // the code(like here). It also allows us to have shorter names.
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  IS_BETA: process.env.NEXT_PUBLIC_IS_BETA,
  DEV_MODE: process.env.NEXT_PUBLIC_DEV_MODE,
  PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
  SENTRY_ENABLED: process.env.NEXT_PUBLIC_SENTRY_ENABLED,
  FEATURE_FLAG_RESTRICTED_ACCESS_DISABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_RESTRICTED_ACCESS_DISABLED,
  THIRD_WEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  VERIDA_NETWORK: process.env.NEXT_PUBLIC_VERIDA_NETWORK,
  VERIDA_NOTIFICATION_SERVER_URL:
    process.env.NEXT_PUBLIC_VERIDA_NOTIFICATION_SERVER_URL,
  VERIDA_RPC_URL: process.env.NEXT_PUBLIC_VERIDA_RPC_URL,
  PRIVATE_DATA_API_BASE_URL: process.env.NEXT_PUBLIC_PRIVATE_DATA_API_BASE_URL,
  FEATURE_FLAG_VERIDA_AUTH_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_VERIDA_AUTH_ENABLED,
  FEATURE_FLAG_AUTHORIZED_APPS_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_AUTHORIZED_APPS_ENABLED,
  FEATURE_FLAG_AI_ASSISTANT_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_AI_ASSISTANT_ENABLED,
  FEATURE_FLAG_AI_ASSISTANT_USER_PROMPTS_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_AI_ASSISTANT_USER_PROMPTS_ENABLED,
  FEATURE_FLAG_AI_ASSISTANT_PROMPT_CONFIG_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_AI_ASSISTANT_PROMPT_CONFIG_ENABLED,
  DEFAULT_AI_PROVIDER: process.env.NEXT_PUBLIC_DEFAULT_AI_PROVIDER,
  DEFAULT_AI_MODEL: process.env.NEXT_PUBLIC_DEFAULT_AI_MODEL,
  FEATURE_FLAG_INBOX_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_INBOX_ENABLED,
  FEATURE_FLAG_DATA_ENABLED: process.env.NEXT_PUBLIC_FEATURE_FLAG_DATA_ENABLED,
  FEATURE_FLAG_DATA_DESTROY_DB_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_DATA_DESTROY_DB_ENABLED,
  FEATURE_FLAG_DATA_DELETE_RECORD_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_DATA_DELETE_RECORD_ENABLED,
  FEATURE_FLAG_DATA_DISPLAY_TECHNICAL_DATABASES:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_DATA_DISPLAY_TECHNICAL_DATABASES,
  FEATURE_FLAG_COMMAND_DIALOG_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_COMMAND_DIALOG_ENABLED,
  FEATURE_FLAG_DATA_CONNECTIONS_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_DATA_CONNECTIONS_ENABLED,
  FEATURE_FLAG_DATA_CONNECTIONS_LOGS_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_DATA_CONNECTIONS_LOGS_ENABLED,
  FEATURE_FLAG_DATA_CONNECTIONS_LOGS_DESTROY_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_DATA_CONNECTIONS_LOGS_DESTROY_ENABLED,
  FEATURE_FLAG_REQUESTS_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_REQUESTS_ENABLED,
  FEATURE_FLAG_APPS_MARKETPLACE_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_APPS_MARKETPLACE_ENABLED,
  isClient: !(typeof window === "undefined"),
  appVersion: version,
})

if (!commonConfigCheckResult.success) {
  // eslint-disable-next-line no-console
  console.warn("Common config errors")
  commonConfigCheckResult.error.errors.forEach((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
  })

  throw new Error("Common config errors")
}

/**
 * Common config available on both the client and the server.
 *
 * All component and piece of code expecting to run on the client should use this config.
 */
export const commonConfig = commonConfigCheckResult.data
