import { ServerConfigSchema } from "./schemas"

const serverEnvVarsCheckResult = ServerConfigSchema.safeParse({
  // Passing the env vars one-by-one as they don't have the same name as the
  // expected value in the schema(e.g.NEXT_PUBLIC_BASE_URL instead of BASE_URL)
  // Also because the schema is not passthrough, for strong typing, so can't
  // pass process.env as there could have other env vars
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  VERIDA_NETWORK: process.env.NEXT_PUBLIC_VERIDA_NETWORK,
  VERIDA_RPC_URL: process.env.NEXT_PUBLIC_VERIDA_RPC_URL,
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE,
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
  FEATURE_FLAG_AI_ASSISTANT_ENABLED:
    process.env.NEXT_PUBLIC_FEATURE_FLAG_AI_ASSISTANT_ENABLED,
  isClient: !(typeof window === "undefined"),
})

if (!serverEnvVarsCheckResult.success) {
  // eslint-disable-next-line no-console
  console.warn("Server environment variables errors")
  serverEnvVarsCheckResult.error.errors.forEach((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
  })

  throw new Error(`Server environment variables errors`)
}

/**
 * Environment variables only avaialble on the server.
 *
 * Never use on a client component or piece of code that can run on the client, use clientConfig instead.
 */
export const serverConfig = serverEnvVarsCheckResult.data
