import { z } from "zod"

export const RestrictedAccessStatusSchema = z.enum(["allowed", "denied"])

export const GetAccessV1SuccessResponseSchema = z.object({
  status: z.literal("success"),
  access: RestrictedAccessStatusSchema,
})

export const GetAccessV1ErrorResponseSchema = z.object({
  status: z.literal("error"),
  access: RestrictedAccessStatusSchema,
  errorCode: z.string(),
  errorMessage: z.string().optional(),
  errorUserMessage: z.string().optional(),
})

export const GetAccessV1ResponseSchema = z.discriminatedUnion("status", [
  GetAccessV1SuccessResponseSchema,
  GetAccessV1ErrorResponseSchema,
])
