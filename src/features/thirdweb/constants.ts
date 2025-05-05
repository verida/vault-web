import { BlockchainAnchor } from "@verida/types"
import { DefaultNetworkBlockchainAnchors, RPC_URLS } from "@verida/vda-common"
import { defineChain, polygon, polygonAmoy } from "thirdweb/chains"
import { createWallet, inAppWallet } from "thirdweb/wallets"

import { commonConfig } from "@/config/common"

const VERIDA_BLOCKCHAIN_ANCHOR: BlockchainAnchor =
  DefaultNetworkBlockchainAnchors[commonConfig.VERIDA_NETWORK]

const CHAIN_CONFIG =
  VERIDA_BLOCKCHAIN_ANCHOR === BlockchainAnchor.POLPOS ? polygon : polygonAmoy

const CHAIN_RPC = RPC_URLS[VERIDA_BLOCKCHAIN_ANCHOR]

export const THIRDWEB_CHAIN = defineChain({
  ...CHAIN_CONFIG,
  rpc: commonConfig.VERIDA_RPC_URL || CHAIN_RPC || CHAIN_CONFIG.rpc,
})

export const THIRDWEB_WALLETS_OPTIONS = [
  inAppWallet({
    auth: {
      options: [
        "email",
        "passkey",
        "google",
        "apple",
        "discord",
        "telegram",
        "x",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("app.phantom"),
  createWallet("co.family.wallet"),
  createWallet("io.rabby"),
]

export const THIRDWEB_IN_APP_WALLET_ID = "inApp"
