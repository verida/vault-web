import { z } from "zod"

import {
  GetAccessV1ResponseSchema,
  RestrictedAccessStatusSchema,
} from "@/features/restricted-access/schemas"

export type RestrictedAccessStatus = z.infer<
  typeof RestrictedAccessStatusSchema
>

export type GetRestrictedAccessV1Response = z.infer<
  typeof GetAccessV1ResponseSchema
>
