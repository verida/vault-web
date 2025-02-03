"use client"

import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export interface VeridaConnectButtonProps
  extends Omit<
    React.ComponentProps<typeof Button>,
    "children" | "disabled" | "onClick"
  > {
  label?: string | React.ReactNode
  connectingLabel?: string | React.ReactNode
}

export function VeridaConnectButton(props: VeridaConnectButtonProps) {
  const {
    label = "Connect with Verida",
    connectingLabel = "Connecting...",
    variant = "primary",
    className,
    ...buttonProps
  } = props

  const { connect, isConnecting, isConnected } = useVerida()

  const handleButtonClick = useCallback(() => {
    if (isConnecting || isConnected) {
      return
    }
    connect()
  }, [connect, isConnecting, isConnected])

  return (
    <Button
      variant={variant}
      className={cn(className)}
      onClick={handleButtonClick}
      disabled={isConnecting}
      {...buttonProps}
    >
      {isConnecting ? connectingLabel : label}
    </Button>
  )
}
VeridaConnectButton.displayName = "VeridaConnectButton"
