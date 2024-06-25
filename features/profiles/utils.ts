import { Client } from "@verida/client-ts";
import { explodeDID } from "@verida/helpers";
import { AccountNodeDIDClientConfig, EnvironmentType } from "@verida/types";
import { isEqual } from "lodash";

import { PublicProfile } from "./@types";
import { getProfilesCache } from "./cache";

export const VERIDA_DID_REGEXP =
  /did:vda:(devnet|mainnet|testnet):0x[0-9a-fA-F]{40}/;

export function isValidVeridaDid(maybeDid: string) {
  return VERIDA_DID_REGEXP.test(maybeDid);
}

export function getNetworkFromDID(did: string): EnvironmentType {
  const { network: networkAsString } = explodeDID(did);
  const network =
    networkAsString === EnvironmentType.MAINNET
      ? EnvironmentType.MAINNET
      : networkAsString === EnvironmentType.TESTNET
        ? EnvironmentType.TESTNET
        : networkAsString === EnvironmentType.DEVNET
          ? EnvironmentType.DEVNET
          : networkAsString === EnvironmentType.LOCAL
            ? EnvironmentType.LOCAL
            : null;

  if (!network) throw new Error(`Invalid Verida Network: ${networkAsString}`);

  return network;
}

export function getDidClientConfigForNetwork(
  network: EnvironmentType
): AccountNodeDIDClientConfig {
  const rpcUrl =
    "https://polygon-mumbai.g.alchemy.com/v2/Q4NRuRlwTNyI90dDCgiX_KT_vS_2gpbN";
  const metaTransactionServerUrl =
    "https://devnet-meta-tx-server.tn.verida.tech";

  return {
    callType: "gasless",
    web3Config: {
      // TODO: Apparently the `callType` property doesn't exist on web3Config, to double check.
      // @ts-expect-error type
      callType: "gasless",
      rpcUrl,
      serverConfig: {
        headers: {
          "context-name": "Verida: Vault",
        },
      },
      postConfig: {
        headers: {
          "user-agent": "Verida: Vault",
        },
      },
      endpointUrl: metaTransactionServerUrl,
    },
    rpcUrl,
  };
}

let client: any;
let currentConfig: any;

export async function getPublicProfileDatastore(
  did: string,
  contextName = "Verida: Vault",
  fallbackToVaultContext = true
) {
  if (!isValidVeridaDid(did)) {
    return; // TODO: Throw an error instead?
  }

  try {
    const network = getNetworkFromDID(did);
    const defaultDidConfig = getDidClientConfigForNetwork(network);

    const config = {
      environment: network,
      didClientConfig: {
        rpcUrl: defaultDidConfig.rpcUrl,
        network: network,
      },
    };

    if (!client || !isEqual(config, currentConfig)) {
      client = new Client(config);
      currentConfig = config;
    }

    return client.openPublicProfile(did, contextName, "basicProfile");
  } catch (error: unknown) {
    console.warn(`Not able to fetch public profile of ${did}`);
    console.error(error);
    return;
  }
}

export async function getPublicProfile(
  did: string,
  contextName = "Verida: Vault",
  fallbackToVaultContext = true
): Promise<PublicProfile> {
  const profileCache = getProfilesCache();
  const profileId = `${contextName}-${did}`;
  const loadedProfile = profileCache.get(profileId)?.value;
  const shouldRefetchProfile =
    Date.now() - (profileCache.get(profileId)?.timestamp ?? 0) > 10 * 60 * 1000; // 10 minutes

  const fetchPublicProfileAndUpdateCache = async () => {
    try {
      const profileDb = await getPublicProfileDatastore(
        did,
        contextName,
        fallbackToVaultContext
      );

      if (!profileDb) {
        return {
          name: "",
        };
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
      ]);

      const p = {
        name: nameResult.status === "fulfilled" ? nameResult.value : "",
        avatar:
          avatarResult.status === "fulfilled" ? avatarResult.value : undefined,
        description:
          descriptionResult.status === "fulfilled"
            ? descriptionResult.value
            : undefined,
        country:
          countryResult.status === "fulfilled"
            ? countryResult.value
            : undefined,
        website:
          websiteResult.status === "fulfilled"
            ? websiteResult.value
            : undefined,
      };

      profileCache.set(profileId, {
        ...p,
      });

      return p;
    } catch (error) {
      console.error(error);

      profileCache.set(profileId, {
        name: "Unknown",
      });

      return {
        name: "",
      };
    }
  };

  if (loadedProfile) {
    shouldRefetchProfile && fetchPublicProfileAndUpdateCache();
    return loadedProfile as any;
  } else {
    return await fetchPublicProfileAndUpdateCache();
  }
}
