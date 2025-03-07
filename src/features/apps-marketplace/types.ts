import { z } from "zod"

import { MarketplaceAppSchema } from "@/features/apps-marketplace/schemas"

export type MarketplaceApp = z.infer<typeof MarketplaceAppSchema>
