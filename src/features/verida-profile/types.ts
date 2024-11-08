import { z } from "zod"

import { VeridaPublicProfileSchema } from "@/features/verida-profile/schemas"

export type VeridaPublicProfile = z.infer<typeof VeridaPublicProfileSchema>
