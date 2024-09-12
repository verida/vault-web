import { z } from "zod"

import { VeridaBaseRecordSchema } from "@/features/verida-database/schemas"

export type VeridaBaseRecord = z.infer<typeof VeridaBaseRecordSchema>

export type VeridaRecord<T = Record<string, unknown>> = VeridaBaseRecord & T

export type VeridaDatabaseQueryFilter<T = Record<string, unknown>> = {
  [K in keyof T | `${string}.${string}`]?:
    | T[K & keyof T]
    | {
        $eq?: T[K & keyof T]
        $ne?: T[K & keyof T]
        $gt?: T[K & keyof T]
        $gte?: T[K & keyof T]
        $lt?: T[K & keyof T]
        $lte?: T[K & keyof T]
        $in?: T[K & keyof T][]
        $nin?: T[K & keyof T][]
        $exists?: boolean
        $type?: string
        $mod?: [number, number]
        $regex?: string
        $options?: string
      }
    | VeridaDatabaseQueryFilter<T[K & keyof T]>
}

export type VeridaDatabaseQueryOptions<T = Record<string, unknown>> = {
  sort?: Record<keyof T, "asc" | "desc">[] // TODO: Make it work on nested objects as well
  limit?: number
  skip?: number
}
