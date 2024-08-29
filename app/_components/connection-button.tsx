"use client"

import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import { useVerida } from "@/features/verida"
import { cn } from "@/lib/utils"

export type ConnectionButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "disabled" | "onClick"
>

export function ConnectionButton(props: ConnectionButtonProps) {
  const { variant = "primary", className, ...buttonProps } = props

  const { connect, isConnecting, isCheckingConnection, isConnected } =
    useVerida()

  const handleButtonClick = useCallback(() => {
    if (isConnecting || isConnected || isCheckingConnection) {
      return
    }
    connect()
  }, [connect, isConnecting, isConnected, isCheckingConnection])

  return (
    <Button
      variant={variant}
      className={cn(className)}
      onClick={handleButtonClick}
      disabled={isConnecting || isCheckingConnection}
      {...buttonProps}
    >
      {isCheckingConnection
        ? "Checking connection..."
        : isConnecting
          ? "Connecting..."
          : "Try the Verida Vault App"}
    </Button>
  )
}
