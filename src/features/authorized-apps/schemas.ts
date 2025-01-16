import { z } from "zod"

export const AuthorizedAppBaseSchema = z.object({
  name: z.string(),
  url: z.string(),
  lastAccessedAt: z.string(),
  scopes: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["data", "api", "unknown"]),
      description: z.string(),
    })
  ),
})
