"use client"

import Image from "next/image"
import { type ComponentProps, type ReactNode, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

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

  const { connectLegacyAccount, isConnecting, isConnected } = useVerida()

  const handleButtonClick = useCallback(() => {
    if (isConnecting || isConnected) {
      return
    }
    connectLegacyAccount()
  }, [connectLegacyAccount, isConnecting, isConnected])

  return (
    <Button
      variant={variant}
      className={cn("flex flex-row items-center gap-1", className)}
      onClick={handleButtonClick}
      disabled={isConnecting}
      {...buttonProps}
    >
      <Image
        src="/assets/verida-wallet-logo.svg"
        alt="Verida Wallet"
        width={24}
        height={24}
      />
      <span>{isConnecting ? connectingLabel : label}</span>
    </Button>
  )
}
VeridaConnectButton.displayName = "VeridaConnectButton"
