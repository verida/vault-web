import { BlockchainAnchor } from "@verida/types"
import { DefaultNetworkBlockchainAnchors } from "@verida/vda-common"
import { polygon, polygonAmoy } from "thirdweb/chains"

import { commonConfig } from "@/config/common"

const VERIDA_BLOCKCHAIN_ANCHOR: BlockchainAnchor =
  DefaultNetworkBlockchainAnchors[commonConfig.VERIDA_NETWORK]

export const THIRDWEB_CHAIN =
  VERIDA_BLOCKCHAIN_ANCHOR === BlockchainAnchor.POLPOS ? polygon : polygonAmoy
