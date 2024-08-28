import { ClientConfigSchema } from "./schemas"

const clientEnvVarsCheckResult = ClientConfigSchema.safeParse({
  // Have to pass the variables one-by-one on the client because they are set
  // and replaced at build time only if they are explicitly used somewhere in
  // the code(like here). Also because the schema is not passthrough, for
  // strong typing, so can't pass process.env as there could have other env vars
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  VERIDA_NETWORK: process.env.NEXT_PUBLIC_VERIDA_NETWORK,
  VERIDA_RPC_URL: process.env.NEXT_PUBLIC_VERIDA_RPC_URL,
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE,
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
  FEATURE_FLAG_AI_ASSISTANT_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_AI_ASSISTANT_ENABLED,
  isClient: !(typeof window === "undefined"),
})

if (!clientEnvVarsCheckResult.success) {
  // eslint-disable-next-line no-console
  console.warn("Client environment variables errors")
  clientEnvVarsCheckResult.error.errors.forEach((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
  })

  throw new Error("Client environment variables errors")
}

/**
 * Environment variables for the client.
 *
 * Also available on the server. All component and piece of code expecting to run on the client should use this config.
 */
export const clientConfig = clientEnvVarsCheckResult.data
