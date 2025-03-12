import { Client } from "@verida/client-ts"
import { type IProfile, Network } from "@verida/types"
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
 * A bit unreliable at the moment, prefer using the client.
 *
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

type GetVeridaProfileFromWebUserArgs = {
  webUserInstance: WebUser
}

/**
 * Retrieves a Verida profile using a WebUser instance.
 *
 * This function is used when fetching the profile of the currently authenticated user.
 *
 * @param args - The arguments for retrieving the profile
 * @param args.webUserInstance - The authenticated WebUser instance to use for fetching the profile
 * @returns The user's Verida profile
 * @throws {Error} If the profile datastore is unavailable or if retrieval fails
 */
export async function getVeridaProfileFromWebUser({
  webUserInstance,
}: GetVeridaProfileFromWebUserArgs): Promise<VeridaProfile> {
  try {
    logger.info("Getting Verida profile from WebUser")
    const vaultContext = webUserInstance.getContext()
    const profileDatastore = await vaultContext.openProfile()

    if (!profileDatastore) {
      throw new Error("Verida profile datastore unavailable")
    }

    const profile = await getVeridaProfileFromDatastore(profileDatastore)

    logger.info("Successfully got Verida profile from WebUser")
    return profile
  } catch (error) {
    throw new Error("Failed to get Verida profile from WebUser", {
      cause: error,
    })
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

    const profile = getVeridaProfileFromDatastore(profileDb)

    logger.info("Successfully retrieved Verida profile from client")
    return profile
  } catch (error) {
    throw new Error("Failed to get Verida profile from client", {
      cause: error,
    })
  }
}

/**
 * Retrieves profile data from a Verida profile datastore.
 *
 * This function concurrently fetches multiple profile fields (name, avatar, description, country, website) from the provided datastore. It uses Promise.allSettled to handle potential failures gracefully - if any individual field fetch fails, that field will be undefined in the returned profile rather than causing the entire operation to fail.
 *
 * @param profileDatastore - The Verida profile datastore to fetch from
 * @returns A VeridaProfile object containing the fetched profile data
 */
async function getVeridaProfileFromDatastore(
  profileDatastore: IProfile
): Promise<VeridaProfile> {
  // Fetch profile data concurrently
  const [
    nameResult,
    avatarResult,
    descriptionResult,
    countryResult,
    websiteResult,
  ] = await Promise.allSettled([
    profileDatastore.get("name"),
    profileDatastore.get("avatar"),
    profileDatastore.get("description"),
    profileDatastore.get("country"),
    profileDatastore.get("website"),
  ])

  const profile: VeridaProfile = {
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

  return profile
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
  webUserInstance: WebUser
}

/**
 * Updates a user's Verida profile with new information.
 *
 * @param webUserInstance - The authenticated Verida web user instance
 * @param profileToSave - The profile data to update containing name, avatar, description etc.
 * @returns The updated Verida profile
 * @throws If profile datastore is unavailable or update fails
 */
export async function updateVeridaProfile({
  webUserInstance,
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

    const updatedProfile = await getVeridaProfileFromWebUser({
      webUserInstance,
    })

    logger.info("Successfully updated Verida profile")
    return updatedProfile
  } catch (error) {
    throw new Error("Failed to update Verida profile", { cause: error })
  }
}
