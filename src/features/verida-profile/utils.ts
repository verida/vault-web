import { Client } from "@verida/client-ts"
import { Network } from "@verida/types"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { VERIDA_PROFILE_DB_NAME } from "@/features/verida-profile/constants"
import { VeridaPublicProfileApiResponseSchema } from "@/features/verida-profile/schemas"
import { VeridaPublicProfile } from "@/features/verida-profile/types"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { isValidVeridaDid } from "@/features/verida/utils"

const logger = Logger.create("verida-profile")

export async function getPublicProfile(
  did: string,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
  fallbackToVaultContext = true
): Promise<VeridaPublicProfile> {
  try {
    const profileDb = await getPublicProfileDatastore({
      did,
      network: commonConfig.VERIDA_NETWORK,
      contextName,
      fallbackToVaultContext,
      rpcUrl: commonConfig.VERIDA_RPC_URL,
    })

    if (!profileDb) {
      return {}
    }

    const [
      nameResult,
      avatarResult,
      descriptionResult,
      countryResult,
      websiteResult,
    ] = await Promise.allSettled([
      await profileDb.get("name"),
      await profileDb.get("avatar"),
      await profileDb.get("description"),
      await profileDb.get("country"),
      await profileDb.get("website"),
    ])

    return {
      name: nameResult.status === "fulfilled" ? nameResult.value : undefined,
      avatar:
        avatarResult.status === "fulfilled" ? avatarResult.value : undefined,
      description:
        descriptionResult.status === "fulfilled"
          ? descriptionResult.value
          : undefined,
      country:
        countryResult.status === "fulfilled" ? countryResult.value : undefined,
      website:
        websiteResult.status === "fulfilled" ? websiteResult.value : undefined,
    }
  } catch (error) {
    return {}
  }
}

type FetchPublicProfileArgs = {
  did: string
  network: Network
  contextName?: string
  ignoreCache?: boolean
}

export async function fetchPublicProfileFromApi({
  did,
  network,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
  ignoreCache = false,
}: FetchPublicProfileArgs): Promise<VeridaPublicProfile> {
  if (!isValidVeridaDid(did)) {
    throw new Error("Invalid DID")
  }

  try {
    const url = new URL(
      // TODO: Extract the base URL in an env variable
      `https://data.verida.network/${did}/${network}/${contextName}/profile_public/${VERIDA_PROFILE_DB_NAME}`
    )
    url.searchParams.set("ignoreCache", ignoreCache.toString())

    const response = await fetch(url.toString())
    const data = await response.json()

    logger.debug("fetchPublicProfileFromApi", { data })

    const validatedProfile = VeridaPublicProfileApiResponseSchema.parse(data)

    return validatedProfile
  } catch (error) {
    throw new Error("Failed to fetch Verida profile", { cause: error })
  }
}

type GetPublicProfileFromClientArgs = {
  did: string
  network: Network
  contextName?: string
  fallbackToVaultContext?: boolean
}

export async function getPublicProfileFromClient({
  did,
  network,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
  fallbackToVaultContext = true,
}: GetPublicProfileFromClientArgs): Promise<VeridaPublicProfile> {
  if (!isValidVeridaDid(did)) {
    throw new Error("Invalid DID")
  }

  try {
    const profileDb = await getPublicProfileDatastore({
      did,
      network,
      contextName,
      fallbackToVaultContext,
      rpcUrl: commonConfig.VERIDA_RPC_URL,
    })

    if (!profileDb) {
      throw new Error("No public profile datastore found")
    }

    const [
      nameResult,
      avatarResult,
      descriptionResult,
      countryResult,
      websiteResult,
    ] = await Promise.allSettled([
      await profileDb.get("name"),
      await profileDb.get("avatar"),
      await profileDb.get("description"),
      await profileDb.get("country"),
      await profileDb.get("website"),
    ])

    return {
      name: nameResult.status === "fulfilled" ? nameResult.value : undefined,
      avatar:
        avatarResult.status === "fulfilled" ? avatarResult.value : undefined,
      description:
        descriptionResult.status === "fulfilled"
          ? descriptionResult.value
          : undefined,
      country:
        countryResult.status === "fulfilled" ? countryResult.value : undefined,
      website:
        websiteResult.status === "fulfilled" ? websiteResult.value : undefined,
    }
  } catch (error) {
    throw new Error("Failed to get public profile from client", {
      cause: error,
    })
  }
}

type GetPublicProfileDatastoreArgs = {
  did: string
  network: Network
  contextName: string
  fallbackToVaultContext?: boolean
  rpcUrl?: string
}

async function getPublicProfileDatastore({
  did,
  network,
  contextName,
  fallbackToVaultContext = true,
  rpcUrl,
}: GetPublicProfileDatastoreArgs) {
  if (!isValidVeridaDid(did)) {
    throw new Error("Invalid DID")
  }

  try {
    const client = new Client({
      network,
      didClientConfig: {
        rpcUrl,
        network,
      },
    })

    return client.openPublicProfile(
      did,
      contextName,
      VERIDA_PROFILE_DB_NAME,
      fallbackToVaultContext && contextName !== VERIDA_VAULT_CONTEXT_NAME
        ? VERIDA_VAULT_CONTEXT_NAME
        : undefined
    )
  } catch (error) {
    throw new Error("Failed to get public profile datastore", {
      cause: error,
    })
  }
}
