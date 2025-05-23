import { ServerConfigSchema } from "@/config/schemas"

const serverConfigCheckResult = ServerConfigSchema.safeParse({
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_APPS_DATABASE_ID: process.env.NOTION_APPS_DATABASE_ID,
})

if (!serverConfigCheckResult.success) {
  // eslint-disable-next-line no-console
  console.warn("Server config errors")
  serverConfigCheckResult.error.errors.forEach((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
  })

  throw new Error(`Server config errors`)
}

/**
 * Configuration only available on the server.
 *
 * Never use on a client component or piece of code that can run on the client, use commonConfig instead.
 */
export const serverConfig = serverConfigCheckResult.data
