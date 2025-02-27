import { z } from "zod"

import { AuthorizedAppBaseSchema } from "@/features/authorized-apps/schemas"
import { VeridaRecord } from "@/features/verida-database/types"

/**
 * @deprecated
 */
export type AuthorizedApp = z.infer<typeof AuthorizedAppBaseSchema>

/**
 * @deprecated
 */
export type AuthorizedAppRecord = VeridaRecord<AuthorizedApp>
