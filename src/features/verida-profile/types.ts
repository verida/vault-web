import { z } from "zod"

import {
  VeridaProfileFormDataSchema,
  VeridaProfileSchema,
} from "@/features/verida-profile/schemas"

export type VeridaProfile = z.infer<typeof VeridaProfileSchema>

export type VeridaProfileFormData = z.infer<typeof VeridaProfileFormDataSchema>
