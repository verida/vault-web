import { BlockchainAnchor } from "@verida/types"
import { defineChain, polygon, polygonAmoy } from "thirdweb/chains"
import { createWallet, inAppWallet } from "thirdweb/wallets"

import {
  VERIDA_BLOCKCHAIN_ANCHOR,
  VERIDA_RPC_URL,
} from "@/features/verida/constants"

const CHAIN_CONFIG =
  VERIDA_BLOCKCHAIN_ANCHOR === BlockchainAnchor.POLPOS ? polygon : polygonAmoy

export const THIRDWEB_CHAIN = defineChain({
  ...CHAIN_CONFIG,
  rpc: VERIDA_RPC_URL || CHAIN_CONFIG.rpc,
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
