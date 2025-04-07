"use client"

import { useTheme } from "next-themes"
import type { ComponentProps } from "react"
import { ConnectEmbed } from "thirdweb/react"

import { APP_DESCRIPTION, APP_NAME } from "@/constants/app"
import { client } from "@/features/thirdweb/client"
import { THIRDWEB_CHAIN } from "@/features/thirdweb/constants"

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
      theme={theme === "dark" ? "dark" : "light"}
      appMetadata={{
        name: APP_NAME,
        description: APP_DESCRIPTION,
      }}
      header={{
        title: APP_NAME,
      }}
      accountAbstraction={{
        chain: THIRDWEB_CHAIN,
        sponsorGas: true,
      }}
    />
  )
}
ThirdwebConnectEmbed.displayName = "ThirdwebConnect"
