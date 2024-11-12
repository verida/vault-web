import { z } from "zod"

export const VerifiableCredentialBaseSchema = z.object({
  id: z.string(),
  issuanceDate: z.string(),
  expirationDate: z.string().optional(),
  credentialSchema: z.object({ id: z.string(), type: z.string() }),
  issuer: z.string(),
  credentialSubject: z.unknown(),
  type: z.array(z.string()),
})
