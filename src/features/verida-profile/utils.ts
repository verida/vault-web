import { Client } from "@verida/client-ts"
import { Network } from "@verida/types"

import { VERIDA_PROFILE_DB_NAME } from "@/features/verida-profile/constants"
import { VeridaProfileApiResponseSchema } from "@/features/verida-profile/schemas"
import { VeridaProfile } from "@/features/verida-profile/types"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { isValidVeridaDid } from "@/features/verida/utils"

type FetchVeridaProfileArgs = {
  did: string
  network: Network
  contextName?: string
  options?: {
    ignoreCache?: boolean
  }
}

export async function fetchVeridaProfileFromApi({
  did,
  network,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
  options,
}: FetchVeridaProfileArgs): Promise<VeridaProfile> {
  if (!isValidVeridaDid(did)) {
    throw new Error("Invalid Verida DID")
  }

  try {
    const url = new URL(
      // TODO: Extract the base URL in an env variable
      `https://data.verida.network/${did}/${network}/${contextName}/profile_public/${VERIDA_PROFILE_DB_NAME}`
    )
    if (options?.ignoreCache) {
      url.searchParams.set("ignoreCache", "true")
    }

    const response = await fetch(url.toString())
    const data = await response.json()

    const validatedProfile = VeridaProfileApiResponseSchema.parse(data)

    return validatedProfile
  } catch (error) {
    throw new Error("Failed to fetch Verida profile from API", { cause: error })
  }
}

type GetVeridaProfileFromClientArgs = {
  did: string
  network: Network
  contextName?: string
  options?: {
    fallbackToVaultContext?: boolean
    rpcUrl?: string
  }
}

export async function getVeridaProfileFromClient({
  did,
  network,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
  options,
}: GetVeridaProfileFromClientArgs): Promise<VeridaProfile> {
  if (!isValidVeridaDid(did)) {
    throw new Error("Invalid Verida DID")
  }

  try {
    const profileDb = await getVeridaProfileDatastore({
      did,
      network,
      contextName,
      fallbackToVaultContext: options?.fallbackToVaultContext,
      rpcUrl: options?.rpcUrl,
    })

    if (!profileDb) {
      throw new Error("No Verida profile datastore found")
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
    throw new Error("Failed to get Verida profile from client", {
      cause: error,
    })
  }
}

type GetVeridaProfileArgs = {
  did: string
  network: Network
  contextName?: string
  apiOptions?: FetchVeridaProfileArgs["options"]
  clientOptions?: GetVeridaProfileFromClientArgs["options"]
}

export async function getVeridaProfile({
  did,
  network,
  contextName,
  apiOptions,
  clientOptions,
}: GetVeridaProfileArgs): Promise<VeridaProfile> {
  // Try to fetch from the API first
  try {
    return await fetchVeridaProfileFromApi({
      did,
      network,
      contextName,
      options: apiOptions,
    })
  } catch (error) {
    // If that fails, try to fetch from the client
    try {
      return await getVeridaProfileFromClient({
        did,
        network,
        contextName,
        options: clientOptions,
      })
    } catch (error) {
      throw new Error("Failed to get Verida profile", { cause: error })
    }
  }
}

type GetVeridaProfileDatastoreArgs = {
  did: string
  network: Network
  contextName: string
  fallbackToVaultContext?: boolean
  rpcUrl?: string
}

async function getVeridaProfileDatastore({
  did,
  network,
  contextName,
  fallbackToVaultContext = true,
  rpcUrl,
}: GetVeridaProfileDatastoreArgs) {
  if (!isValidVeridaDid(did)) {
    throw new Error("Invalid Verida DID")
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
    throw new Error("Failed to get Verida profile datastore", {
      cause: error,
    })
  }
}
