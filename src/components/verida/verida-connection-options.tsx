import type { ComponentProps } from "react"

import { Typography } from "@/components/ui/typography"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { ThirdwebConnectEmbed } from "@/features/thirdweb/components/thirdweb-connect-embed"
import { cn } from "@/styles/utils"

export interface VeridaConnectionOptionsProps
  extends Omit<ComponentProps<"div">, "children"> {}

export function VeridaConnectionOptions(props: VeridaConnectionOptionsProps) {
  const { className, ...divProps } = props

  return (
    <div className={cn("flex flex-col gap-8", className)} {...divProps}>
      <ThirdwebConnectEmbed />
      <div className="flex flex-col gap-2">
        <Typography variant="heading-5" component="p" className="text-center">
          Using the Verida Wallet?
        </Typography>
        <VeridaConnectButton
          variant="outline"
          label="Connect with Verida Wallet"
        />
      </div>
    </div>
  )
}
VeridaConnectionOptions.displayName = "VeridaConnectionOptions"
