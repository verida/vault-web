import type { BlockchainAnchor } from "@verida/types"
import { DefaultNetworkBlockchainAnchors, RPC_URLS } from "@verida/vda-common"

import { commonConfig } from "@/config/common"

export const VERIDA_VAULT_CONTEXT_NAME = "Verida: Vault"

export const VERIDA_DID_REGEXP =
  /did:vda:(polpos|mainnet|polamoy|devnet):0x[0-9a-fA-F]{40}/

export const VERIDA_DEFAULT_STORAGE_NODE_COUNTRY_CODE = "US"

export const VERIDA_BLOCKCHAIN_ANCHOR: BlockchainAnchor =
  DefaultNetworkBlockchainAnchors[commonConfig.VERIDA_NETWORK]

export const VERIDA_RPC_URL =
  commonConfig.VERIDA_RPC_URL || RPC_URLS[VERIDA_BLOCKCHAIN_ANCHOR] || undefined
