"use client"

import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import { useVerida } from "@/features/verida"
import { cn } from "@/styles/utils"

export type ConnectionButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "disabled" | "onClick"
>

export function ConnectionButton(props: ConnectionButtonProps) {
  const { variant = "primary", className, ...buttonProps } = props

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
      {isConnecting ? "Connecting..." : "Connect to the Verida Vault App"}
    </Button>
  )
}
