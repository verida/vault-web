import type { Context } from "@verida/client-ts"
import StorageEngineVerida from "@verida/client-ts/dist/context/engines/verida/database/engine"
import type {
  AuthTypeConfig,
  ContextSession,
  VeridaDatabaseAuthContext,
} from "@verida/types"

import {
  VERIDA_DID_REGEXP,
  VERIDA_VAULT_CONTEXT_NAME,
} from "@/features/verida/constants"

export function isValidVeridaDid(maybeDid: string) {
  return VERIDA_DID_REGEXP.test(maybeDid)
}

export async function buildSession(context: Context) {
  const account = context.getAccount()
  const keyring = await account.keyring(VERIDA_VAULT_CONTEXT_NAME)
  const signature = keyring.getSeed()
  const did = await account.did()
  const contextConfig = await context.getContextConfig()

  // Get a context auth object and force create so we get a new refresh token
  const dbEngine = await context.getDatabaseEngine(did, true)
  const endpoints = (dbEngine as StorageEngineVerida).getEndpoints()

  const contextAuths: Record<string, VeridaDatabaseAuthContext | undefined> = {}
  for (const endpointUri in endpoints) {
    const contextAuth = (await context.getAuthContext({
      force: true,
      endpointUri: endpointUri,
    } as AuthTypeConfig)) as VeridaDatabaseAuthContext

    contextAuths[endpointUri] = contextAuth
  }

  const session: ContextSession = {
    signature,
    did,
    contextConfig,
    contextAuths,
    contextName: VERIDA_VAULT_CONTEXT_NAME,
  }

  return session
}

export function buildSessionToken(contextSession: ContextSession) {
  const stringifiedSession = JSON.stringify(contextSession)
  const sessionToken = Buffer.from(stringifiedSession).toString("base64")
  return sessionToken
}
