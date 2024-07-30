import BinanceImage from "@/assets/binance.svg";
import ByBitImage from "@/assets/bybit.png";
import DiscordImage from "@/assets/discord.png";
import GateImage from "@/assets/gate.png";
import KaggleImage from "@/assets/kaggle.png";
import KuCoinImage from "@/assets/kucoin.png";
import MexcImage from "@/assets/mexc.png";
import ReclaimImage from "@/assets/reclaim.svg";
import UberImage from "@/assets/uber.png";
import ZkPassImage from "@/assets/zkpass.svg";

import { Credential } from "../types";

export const credentialProviders = {
  zkPass: {
    name: "zkPass",
    image: ZkPassImage,
    schema:
      "https://common.schemas.verida.io/credential/zkpass/v0.1.0/schema.json",
  },
  reclaim: {
    name: "reclaim",
    image: ReclaimImage,
    schema:
      "https://common.schemas.verida.io/credential/zkpass/v0.1.0/schema.json",
  },
};

export const VeridaDid =
  "did:vda:mainnet:0x378E209c8Cdc071b1ad7d0b4aBE300309A7bE541";

export const ZkPassAppId = "bced693b-bedc-464c-8250-566743ff5855";

export const credentials: Credential[] = [
  {
    id: "ef39adb26c88439591279e25e7856b61",
    name: "Uber",
    title: "Verify ownership of your Uber account",
    host: "Uber",
    icon: UberImage.src,
    type: "Ownership Proof",
    description: "Verify ownership of your Uber account",
    message: "Uber account ownership",
    provider: credentialProviders.zkPass,
  },
  {
    id: "c0519cf1b26c403096a6af51f41e3f8d",
    name: "Discord",
    title: "Verify ownership of your Discord account",
    host: "Discord",
    icon: DiscordImage.src,
    type: "Ownership proof",
    description: "Verify ownership of your Discord account",
    message: "Discord account ownership",
    provider: credentialProviders.zkPass,
  },
  {
    id: "f3a4394b-191a-4889-9f5c-e0d70dc26fac",
    name: "Uber",
    title: "Verify ownership of your Uber account",
    description: "Verify ownership of your Uber account",
    host: "Uber",
    icon: UberImage.src,
    type: "Ownership Proof",
    message: "Uber account ownership",
    provider: credentialProviders.reclaim,
  },
  {
    id: "c94476a0-8a75-4563-b70a-bf6124d7c59b",
    name: "Kaggle",
    title: "Verify ownership of your Kaggle account",
    description: "Verify ownership of your Kaggle account",
    host: "Kaggle",
    icon: KaggleImage.src,
    type: "Ownership Proof",
    message: "Kaggle account ownership",
    provider: credentialProviders.reclaim,
  },
  {
    id: "bc44047a987e4872b08e96223ed5775a",
    name: "Binance",
    title: "Verify KYC level of your Binance account",
    description: "Verify KYC level of your Binance account",
    message: "Binance account KYC verification",
    host: "Binance",
    icon: BinanceImage.src,
    type: "KYC Proof",
    provider: credentialProviders.zkPass,
  },
  {
    id: "5f83218da6e544e7ac41566d0840e842",
    name: "Bybit",
    title: "Verify KYC level of your Bybit account",
    description: "Verify KYC level of your Bybit account",
    message: "Bybit account KYC verification",
    host: "Bybit",
    icon: ByBitImage.src,
    type: "KYC Proof",
    provider: credentialProviders.zkPass,
  },
  {
    id: "01c1439e852f47aaa4f697cef14d3e94",
    name: "KuCoin",
    title: "Verify KYC level of your KuCoin account",
    description: "Verify KYC level of your KuCoin account",
    message: "Kucoin account KYC verification",
    host: "KuCoin",
    icon: KuCoinImage.src,
    type: "KYC Proof",
    provider: credentialProviders.zkPass,
  },
  {
    id: "a0b39e397cc54083a1bb1ba3ea3338f9",
    name: "MEXC",
    title: "Verify KYC level of your MEXC account",
    description: "Verify KYC level of your MEXC account",
    message: "MEXC account KYC verification",
    host: "MEXC",
    icon: MexcImage.src,
    type: "KYC Proof",
    provider: credentialProviders.zkPass,
  },
  {
    id: "cada76adb71f4de6be8748a4ab17b074",
    name: "Gate",
    title: "Verify KYC level of your Gate account",
    description: "Verify KYC level of your Gate account",
    message: "Gate account KYC verification",
    host: "Gate",
    icon: GateImage.src,
    type: "KYC Proof",
    provider: credentialProviders.zkPass,
  },

  {
    id: "67bd34153e9e45bcabe75300c72ecf06",
    name: "Binance",
    title: "Verify ownership of your Binance account",
    description: "Verify ownership of your Binance account",
    message: "Binance account ownership",
    host: "Binance",
    icon: BinanceImage.src,
    type: "Ownership Proof",
    provider: credentialProviders.zkPass,
  },
  {
    id: "96c3dcf5807342069e9bf4b02e6fc2fe",
    name: "Bybit",
    title: "Verify ownership of your Bybit account",
    description: "Verify ownership of your Bybit account",
    message: "Bybit account ownership",
    host: "Bybit",
    icon: ByBitImage.src,
    type: "Ownership Proof",
    provider: credentialProviders.zkPass,
  },
  {
    id: "640719c1bdf44aabaca519f12e184d54",
    name: "MEXC",
    title: "Verify ownership of your MEXC account",
    description: "Verify ownership of your MEXC account",
    message: "MEXC account ownership",
    host: "MEXC",
    icon: MexcImage.src,
    type: "Ownership Proof",
    provider: credentialProviders.zkPass,
  },
  {
    id: "20663ead45694b8682ece3ed4b4e00d4",
    name: "Gate",
    title: "Verify ownership of your Gate account",
    description: "Verify ownership of your Gate account",
    message: "Gate account ownership",
    host: "Gate",
    icon: GateImage.src,
    type: "Ownership Proof",
    provider: credentialProviders.zkPass,
  },
  {
    id: "df666f142a264ea99db95bb64012f514",
    name: "KuCoin",
    title: "Verify ownership of your KuCoin account",
    description: "Verify ownership of your KuCoin account",
    message: "Kucoin account ownership",
    host: "KuCoin",
    icon: KuCoinImage.src,
    type: "Ownership Proof",
    provider: credentialProviders.zkPass,
  },
];
