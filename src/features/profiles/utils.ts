import { Client } from "@verida/client-ts"

import { commonConfig } from "@/config/common"
import { PublicProfile } from "@/features/profiles/types"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { isValidVeridaDid } from "@/features/verida/utils"

async function getPublicProfileDatastore(
  did: string,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
  fallbackToVaultContext = true
) {
  if (!isValidVeridaDid(did)) {
    return // TODO: Throw an error instead?
  }

  try {
    const client = new Client({
      network: commonConfig.VERIDA_NETWORK,
      didClientConfig: {
        rpcUrl: commonConfig.VERIDA_RPC_URL,
        network: commonConfig.VERIDA_NETWORK,
      },
    })

    return client.openPublicProfile(
      did,
      contextName,
      "basicProfile",
      fallbackToVaultContext ? VERIDA_VAULT_CONTEXT_NAME : undefined
    )
  } catch (error: unknown) {
    return
  }
}

export async function getPublicProfile(
  did: string,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
  fallbackToVaultContext = true
): Promise<PublicProfile> {
  try {
    const profileDb = await getPublicProfileDatastore(
      did,
      contextName,
      fallbackToVaultContext
    )

    if (!profileDb) {
      return {
        name: "",
      }
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
      name: nameResult.status === "fulfilled" ? nameResult.value : "",
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
    return {
      name: "",
    }
  }
}
