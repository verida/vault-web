import { ServerEnvVarsSchema } from "./schemas"

const serverEnvVarsCheckResult = ServerEnvVarsSchema.safeParse(process.env)

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
 */
export const serverEnvVars = serverEnvVarsCheckResult.data
