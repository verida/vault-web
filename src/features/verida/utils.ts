import { AutoAccount } from "@verida/account-node"
import type { Context } from "@verida/client-ts"
import StorageEngineVerida from "@verida/client-ts/dist/context/engines/verida/database/engine"
import type {
  AccountNodeDIDClientConfig,
  AuthTypeConfig,
  ContextSession,
  VeridaDatabaseAuthContext,
} from "@verida/types"
import { Signer, ethers } from "ethers"
import type { Account as ThirdWebAccount } from "thirdweb/wallets"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { client as thirdWebClient } from "@/features/thirdweb/client"
import { THIRDWEB_CHAIN } from "@/features/thirdweb/constants"
import { getEthersSignerForAccount } from "@/features/thirdweb/utils"
import {
  VERIDA_DID_REGEXP,
  VERIDA_VAULT_CONTEXT_NAME,
} from "@/features/verida/constants"

const logger = Logger.create("verida")

export function isValidVeridaDid(maybeDid: string) {
  return VERIDA_DID_REGEXP.test(maybeDid)
}

export async function checkAccountExists(account: AutoAccount) {
  try {
    const did = await account.did()
    logger.info("Checking account exists", { did })

    // Fetching DID document
    const didClient = account.getDIDClient()
    const didDocument = await didClient.get(did)

    if (didDocument) {
      logger.info("Account exists", { did })
      return true
    }

    logger.info("Account does not exist", { did })
    return false
  } catch (error) {
    logger.debug("Error checking account exists")
    logger.error(error)
    return false
  }
}

function buildConnectionConsentMessage(address: string) {
  return `Do you want to use your account ${address.toLowerCase()} to connect to Verida?`
}

function buildDidClientConfig(
  sponsoringSigner: Signer,
  rpcUrl?: string
): AccountNodeDIDClientConfig {
  const config: AccountNodeDIDClientConfig = {
    callType: "web3",
    web3Config: {
      signer: sponsoringSigner,
      rpcUrl,
    },
    rpcUrl,
  }

  return config
}

export async function buildVeridaAccountFromThirdWeb(
  thirdWebAccount: ThirdWebAccount,
  sponsoringAccount: ThirdWebAccount
) {
  logger.debug("================================================")
  logger.debug("Building verida account")

  const consentMessage = buildConnectionConsentMessage(thirdWebAccount.address)
  logger.debug(`Signing connect message: ${consentMessage}`)

  // A ECDSA signature of the message is used to prove ownership of the account
  const signedConsentMessage = await thirdWebAccount.signMessage({
    message: consentMessage,
  })
  logger.debug(`Signed consent message: ${signedConsentMessage}`)

  // Generating an entropy based on the deterministic signature of the consent message
  // 0x + 64 hex chars = 32 bytes
  const entropy = signedConsentMessage.slice(0, 66)
  const mnemonic = ethers.utils.entropyToMnemonic(entropy)
  logger.debug(`Mnemonic: ${mnemonic}`)

  const veridaAccountControllerWallet = ethers.Wallet.fromMnemonic(mnemonic)
  logger.debug(`Controller address: ${veridaAccountControllerWallet.address}`)
  logger.debug(
    `Controller private key: ${veridaAccountControllerWallet.privateKey}`
  )

  const signer = await getEthersSignerForAccount(
    thirdWebClient,
    THIRDWEB_CHAIN,
    sponsoringAccount
  )
  const didClientConfig = buildDidClientConfig(
    signer,
    commonConfig.VERIDA_RPC_URL
  )

  const account = new AutoAccount({
    privateKey: veridaAccountControllerWallet.privateKey,
    network: commonConfig.VERIDA_NETWORK,
    didClientConfig,
  })

  logger.debug("================================================")
  return account
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
