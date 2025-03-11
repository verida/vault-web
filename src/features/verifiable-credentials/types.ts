import { z } from "zod"

import type { VeridaBaseRecord } from "@/features/verida-database/types"
import { VerifiableCredentialBaseSchema } from "@/features/verifiable-credentials/schemas"

export type VerifiableCredentialBase = z.infer<
  typeof VerifiableCredentialBaseSchema
>

// TODO: May have to use an interface to extend instead of the type union to
// Override the credentialSubject type
export type VerifiableCredential<T = unknown> = VerifiableCredentialBase & {
  credentialSubject: T
}

export type VeridaVerifiableCredentialRecord<T = unknown> = VeridaBaseRecord & {
  credentialData: VerifiableCredential<T>
  credentialSchema: string
}
