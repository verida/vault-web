import { z } from "zod"

/**
 * Schema for validating an application in the marketplace.
 */
export const MarketplaceAppSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.union([z.string().url(), z.string().optional()]),
  description: z.string().optional(),
  logoUrl: z.union([z.string().url(), z.string().optional()]),
  categories: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional().default(false),
})

/**
 * Schema for validating an array of applications.
 */
export const MarketplaceAppsArraySchema = z.array(MarketplaceAppSchema)
