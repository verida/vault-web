"use client"

import Image from "next/image"
import { type ComponentProps, type ReactNode, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Logger } from "@/features/telemetry/logger"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

const logger = Logger.create("verida")

export interface VeridaConnectButtonProps
  extends Omit<
    ComponentProps<typeof Button>,
    "children" | "disabled" | "onClick"
  > {
  label?: string | ReactNode
  connectingLabel?: string | ReactNode
}

export function VeridaConnectButton(props: VeridaConnectButtonProps) {
  const {
    label = "Connect with Verida",
    connectingLabel = "Connecting...",
    variant = "primary",
    className,
    ...buttonProps
  } = props

  const { connectLegacyAccount, status } = useVerida()

  const handleButtonClick = useCallback(() => {
    if (status === "connecting" || status === "connected") {
      return
    }
    connectLegacyAccount().catch(logger.error)
  }, [connectLegacyAccount, status])

  return (
    <Button
      variant={variant}
      className={cn("flex flex-row items-center gap-1", className)}
      onClick={handleButtonClick}
      disabled={status === "connecting"}
      {...buttonProps}
    >
      <Image
        src="/assets/verida-wallet-logo.svg"
        alt="Verida Wallet"
        width={24}
        height={24}
      />
      <span>{status === "connecting" ? connectingLabel : label}</span>
    </Button>
  )
}
VeridaConnectButton.displayName = "VeridaConnectButton"
