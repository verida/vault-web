import { z } from "zod"

export const VerifiableCredentialBaseSchema = z
  .object({
    id: z.string(),
    issuanceDate: z.string().datetime(),
    expirationDate: z.string().datetime().optional(),
    credentialSchema: z.object({ id: z.string(), type: z.string() }),
    issuer: z.string(),
    credentialSubject: z.unknown(),
    type: z.array(z.string()),
  })
  .passthrough()
