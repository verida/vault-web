import { BlockchainAnchor } from "@verida/types"
import { DefaultNetworkBlockchainAnchors } from "@verida/vda-common"
import { polygon, polygonAmoy } from "thirdweb/chains"
import { inAppWallet } from "thirdweb/wallets"

import { commonConfig } from "@/config/common"

const VERIDA_BLOCKCHAIN_ANCHOR: BlockchainAnchor =
  DefaultNetworkBlockchainAnchors[commonConfig.VERIDA_NETWORK]

export const THIRDWEB_CHAIN =
  VERIDA_BLOCKCHAIN_ANCHOR === BlockchainAnchor.POLPOS ? polygon : polygonAmoy

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
        "wallet",
      ],
    },
  }),
]
