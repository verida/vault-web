"use client"

import type { ComponentProps } from "react"
import { useActiveWalletConnectionStatus } from "thirdweb/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
} from "@/components/ui/loading"
import { Typography } from "@/components/ui/typography"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { ThirdwebConnectEmbed } from "@/features/thirdweb/components/thirdweb-connect-embed"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export interface VeridaConnectionOptionsProps
  extends Omit<ComponentProps<"div">, "children"> {}

export function VeridaConnectionOptions(props: VeridaConnectionOptionsProps) {
  const { className, ...divProps } = props

  const thirdWebStatus = useActiveWalletConnectionStatus()
  const { isConnected, requestThirdWebConsentSignature } = useVerida()

  return (
    <div className={cn("flex flex-col gap-8", className)} {...divProps}>
      {isConnected ? null : thirdWebStatus !== "connected" ? (
        <ThirdwebConnectEmbed />
      ) : (
        <Card>
          <LoadingBlock className="min-h-[350px] w-[358px] justify-center">
            <LoadingBlockSpinner />
            <LoadingBlockDescription>
              Waiting for signature...
            </LoadingBlockDescription>
            <Button variant="outline" onClick={requestThirdWebConsentSignature}>
              Retry
            </Button>
          </LoadingBlock>
        </Card>
      )}
      {thirdWebStatus === "disconnected" || thirdWebStatus === "unknown" ? (
        <div className="flex flex-col gap-2">
          <Typography variant="heading-5" component="p" className="text-center">
            Using the Verida Wallet?
          </Typography>
          <VeridaConnectButton
            variant="outline"
            label="Connect with Verida Wallet"
          />
        </div>
      ) : null}
    </div>
  )
}
VeridaConnectionOptions.displayName = "VeridaConnectionOptions"
