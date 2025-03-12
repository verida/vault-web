import { Client } from "@verida/client-ts"
import { Network } from "@verida/types"
import type { WebUser } from "@verida/web-helpers"

import { Logger } from "@/features/telemetry/logger"
import { VERIDA_PROFILE_DB_NAME } from "@/features/verida-profile/constants"
import { VeridaProfileApiResponseSchema } from "@/features/verida-profile/schemas"
import type { VeridaProfile } from "@/features/verida-profile/types"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { isValidVeridaDid } from "@/features/verida/utils"

const logger = Logger.create("verida-profile")

type FetchVeridaProfileArgs = {
  did: string
  network: Network
  contextName?: string
  options?: {
    ignoreCache?: boolean
  }
}

/**
 * Fetches a Verida profile from the API.
 *
 * @param args - The arguments for fetching the profile.
 * @returns The fetched Verida profile.
 * @throws If the DID is invalid or if fetching fails.
 */
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
    logger.info("Fetching Verida profile from API")

    const url = new URL(
      // TODO: Extract the base URL in an env variable
      `https://data.verida.network/${did}/${network}/${contextName}/profile_public/${VERIDA_PROFILE_DB_NAME}`
    )
    if (options?.ignoreCache) {
      url.searchParams.set("ignoreCache", "true")
    }

    const response = await fetch(url)

    const data = await response.json()

    const validatedProfile = VeridaProfileApiResponseSchema.parse(data)
    logger.info("Successfully fetched and validated Verida profile from API")

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

/**
 * Retrieves a Verida profile using the Verida client.
 * @param args - The arguments for retrieving the profile.
 * @returns The retrieved Verida profile.
 * @throws If the DID is invalid or if retrieval fails.
 */
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
    logger.info("Fetching Verida profile from Verida client")
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

    // Fetch profile data concurrently
    const [
      nameResult,
      avatarResult,
      descriptionResult,
      countryResult,
      websiteResult,
    ] = await Promise.allSettled([
      profileDb.get("name"),
      profileDb.get("avatar"),
      profileDb.get("description"),
      profileDb.get("country"),
      profileDb.get("website"),
    ])

    const profile = {
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

    logger.info("Successfully retrieved Verida profile from client")
    return profile
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

/**
 * Retrieves a Verida profile, first attempting to fetch from the API,
 * then falling back to the client if API fetch fails.
 * @param args - The arguments for retrieving the profile.
 * @returns The retrieved Verida profile.
 * @throws If both API and client retrieval methods fail.
 */
export async function getVeridaProfile({
  did,
  network,
  contextName,
  apiOptions,
  clientOptions,
}: GetVeridaProfileArgs): Promise<VeridaProfile> {
  logger.info("Getting Verida profile")

  // Try to fetch from the API first
  try {
    return await fetchVeridaProfileFromApi({
      did,
      network,
      contextName,
      options: apiOptions,
    })
  } catch (apiError) {
    logger.error(apiError)
    logger.warn(
      "Failed to fetch Verida profile from API, falling back to Verida client"
    )

    // If API fetch fails, try to fetch from the client
    try {
      return await getVeridaProfileFromClient({
        did,
        network,
        contextName,
        options: clientOptions,
      })
    } catch (clientError) {
      throw new Error("Failed to get Verida profile", { cause: clientError })
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

/**
 * Retrieves the Verida profile datastore.
 *
 * @param args - The arguments for retrieving the datastore.
 * @returns The Verida profile datastore.
 * @throws If the DID is invalid or if datastore retrieval fails.
 */
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

export type UpdateVeridaProfileArgs = {
  profileToSave: VeridaProfile
  did: string
  webUserInstance: WebUser
  network: Network
  rpcUrl?: string
  contextName?: string
}

export async function updateVeridaProfile({
  webUserInstance,
  did,
  network,
  rpcUrl,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
  profileToSave,
}: UpdateVeridaProfileArgs) {
  logger.info("Updating user profile")

  try {
    const vaultContext = webUserInstance.getContext()
    const profileDatastore = await vaultContext.openProfile()

    if (!profileDatastore) {
      throw new Error("Verida profile datastore unavailable")
    }

    // Unfortunatelly, looks like we can't Promise.all the set calls as it creates conflicts
    await profileDatastore.set("name", profileToSave.name)
    await profileDatastore.set("avatar", profileToSave.avatar)
    await profileDatastore.set("description", profileToSave.description)
    await profileDatastore.set("country", profileToSave.country)
    await profileDatastore.set("website", profileToSave.website)

    const updatedProfile = await getVeridaProfileFromClient({
      did,
      network,
      contextName,
      options: {
        rpcUrl,
      },
    })

    logger.info("Successfully updated Verida profile")
    return updatedProfile
  } catch (error) {
    throw new Error("Failed to update Verida profile", { cause: error })
  }
}
