import { Client, Context } from "@verida/client-ts"
import { type IProfile, Network } from "@verida/types"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { VERIDA_PROFILE_DB_NAME } from "@/features/verida-profile/constants"
import { VeridaProfileApiResponseSchema } from "@/features/verida-profile/schemas"
import type { VeridaProfile } from "@/features/verida-profile/types"
import {
  VERIDA_RPC_URL,
  VERIDA_VAULT_CONTEXT_NAME,
} from "@/features/verida/constants"
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
 * A bit unreliable at the moment, prefer using the client or context methods.
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

type GetVeridaProfileFromContextArgs = {
  context: Context
}

/**
 * Retrieves a Verida profile using a Context instance.
 *
 * This function is used when fetching the profile of the currently authenticated user.
 *
 * @param args - The arguments for retrieving the profile
 * @param args.context - The authenticated Context instance to use for fetching the profile
 * @returns The user's Verida profile
 * @throws {Error} If the profile datastore is unavailable or if retrieval fails
 */
export async function getVeridaProfileFromContext({
  context,
}: GetVeridaProfileFromContextArgs): Promise<VeridaProfile> {
  logger.info("Getting Verida profile from Context")

  try {
    const profileDatastore = await context.openProfile(VERIDA_PROFILE_DB_NAME)

    if (!profileDatastore) {
      throw new Error("Verida profile datastore unavailable")
    }

    const profile = await getVeridaProfileFromDatastore(profileDatastore)

    logger.info("Successfully got Verida profile from Context")
    return profile
  } catch (error) {
    throw new Error("Failed to get Verida profile from Context", {
      cause: error,
    })
  }
}

type GetAnyVeridaProfileArgs = {
  did: string
}

/**
 * Get any Verida profile.
 *
 * @param args - The arguments for retrieving the profile.
 * @param args.did - The DID of the user to retrieve the profile for.
 * @returns The retrieved Verida profile.
 * @throws If the DID is invalid or if retrieval fails.
 */
export async function getAnyVeridaProfile({
  did,
}: GetAnyVeridaProfileArgs): Promise<VeridaProfile> {
  logger.info("Getting a Verida profile")

  if (!isValidVeridaDid(did)) {
    throw new Error("Invalid Verida DID")
  }

  try {
    // Creating a new client. For some reason the client instance from the
    // connected user is not able to get the profile of other users.
    const client = new Client({
      network: commonConfig.VERIDA_NETWORK,
      didClientConfig: {
        network: commonConfig.VERIDA_NETWORK,
        rpcUrl: VERIDA_RPC_URL,
      },
    })

    const profileDb = await client.openPublicProfile(
      did,
      VERIDA_VAULT_CONTEXT_NAME,
      VERIDA_PROFILE_DB_NAME,
      VERIDA_VAULT_CONTEXT_NAME
    )

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

  logger.info("Getting Verida profile from datastore")

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

export type UpdateVeridaProfileArgs = {
  context: Context
  profileToSave: VeridaProfile
}

/**
 * Updates a user's Verida profile with new information.
 *
 * @param args - The arguments for updating the profile.
 * @param args.context - The authenticated Verida context instance.
 * @param args.profileToSave - The profile data to update containing name, avatar, description etc.
 * @returns The updated Verida profile
 * @throws If profile datastore is unavailable or update fails
 */
export async function updateVeridaProfile({
  context,
  profileToSave,
}: UpdateVeridaProfileArgs) {
  logger.info("Updating user profile")

  try {
    logger.debug("Opening profile datastore")
    const profileDatastore = await context.openProfile(VERIDA_PROFILE_DB_NAME)

    if (!profileDatastore) {
      logger.debug("Profile datastore unavailable")
      throw new Error("Verida profile datastore unavailable")
    }

    const { name, avatar, description, country, website } = profileToSave

    logger.debug("Setting datastore fields")
    // Unfortunatelly, looks like we can't Promise.all the set calls as it creates conflicts
    await setDatastoreField(profileDatastore, "name", name)
    await setDatastoreField(profileDatastore, "avatar", avatar)
    await setDatastoreField(profileDatastore, "description", description)
    await setDatastoreField(profileDatastore, "country", country)
    await setDatastoreField(profileDatastore, "website", website)

    logger.debug("Getting updated profile")
    const updatedProfile = await getVeridaProfileFromContext({
      context,
    })

    logger.info("Successfully updated Verida profile")
    return updatedProfile
  } catch (error) {
    throw new Error("Failed to update Verida profile", { cause: error })
  }
}

function setDatastoreField(
  datastore: IProfile,
  field: string,
  value: any | undefined
) {
  return datastore.set(field, value === "" ? undefined : value)
}
