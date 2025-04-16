"use client"

import { useTheme } from "next-themes"
import type { ComponentProps } from "react"
import { ConnectEmbed } from "thirdweb/react"

import { commonConfig } from "@/config/common"
import {
  APP_DESCRIPTION,
  APP_NAME,
  PRIVACY_POLICY_URL,
  TERMS_AND_CONDITIONS_URL,
} from "@/constants/app"
import { client } from "@/features/thirdweb/client"
import {
  THIRDWEB_CHAIN,
  THIRDWEB_WALLETS_OPTIONS,
} from "@/features/thirdweb/constants"

export interface ThirdwebConnectEmbedProps
  extends Omit<
    ComponentProps<typeof ConnectEmbed>,
    "client" | "theme" | "appMetadata" | "header" | "accountAbstraction"
  > {}

export function ThirdwebConnectEmbed(props: ThirdwebConnectEmbedProps) {
  const { theme } = useTheme()

  return (
    <ConnectEmbed
      {...props}
      client={client}
      wallets={THIRDWEB_WALLETS_OPTIONS}
      appMetadata={{
        name: APP_NAME,
        description: APP_DESCRIPTION,
        url: commonConfig.BASE_URL,
        logoUrl: `${commonConfig.BASE_URL}/logo.svg`,
      }}
      accountAbstraction={{
        chain: THIRDWEB_CHAIN,
        sponsorGas: true,
      }}
      theme={theme === "dark" ? "dark" : "light"}
      termsOfServiceUrl={TERMS_AND_CONDITIONS_URL}
      privacyPolicyUrl={PRIVACY_POLICY_URL}
    />
  )
}
ThirdwebConnectEmbed.displayName = "ThirdwebConnect"
