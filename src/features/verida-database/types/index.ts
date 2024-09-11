import { z } from "zod"

import { VeridaBaseRecordSchema } from "@/features/verida-database/schemas"

export type VeridaBaseRecord = z.infer<typeof VeridaBaseRecordSchema>

export type VeridaRecord<T = Record<string, unknown>> = VeridaBaseRecord & T
