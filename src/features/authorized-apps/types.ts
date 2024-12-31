import { z } from "zod"

import { AuthorizedAppBaseSchema } from "@/features/authorized-apps/schemas"
import { VeridaRecord } from "@/features/verida-database/types"

export type AuthorizedApp = z.infer<typeof AuthorizedAppBaseSchema>

export type AuthorizedAppRecord = VeridaRecord<AuthorizedApp>
