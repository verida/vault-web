import { ServerConfigSchema } from "@/config/schemas"

const serverConfigCheckResult = ServerConfigSchema.safeParse({
  // Passing the env vars one-by-one as they don't have the same name as the
  // expected value in the schema(e.g.NEXT_PUBLIC_BASE_URL instead of BASE_URL)
  // Also because the schema is not passthrough, for strong typing, so can't
  // pass process.env as there could have other env vars
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
 * Configuration only avaialble on the server.
 *
 * Never use on a client component or piece of code that can run on the client, use commonConfig instead.
 */
export const serverConfig = serverConfigCheckResult.data
