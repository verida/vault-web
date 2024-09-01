"use client"

import { useMemo } from "react"

import { VLogo } from "@/components/icons/logo"
import { Switch } from "@/components/icons/switch"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { connections } from "@/features/connections"

export type ConnectConnectionDialogProps = {
  isOpen: boolean
  onClose: () => void
  connectionId: string
}

export function ConnectConnectionDialog(props: ConnectConnectionDialogProps) {
  const { connectionId, isOpen, onClose } = props

  const connection = useMemo(() => {
    return connections.find((c) => c.id === connectionId)
  }, [connectionId])

  if (!connection) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Connect with {connection.id}</DialogTitle>
        </DialogHeader>
        <DialogContent className="flex flex-col gap-8">
          <div className="flex flex-row items-center justify-center gap-6">
            {connection.icon && <connection.icon className="h-20 w-20" />}
            <Switch />
            <VLogo className="rounded-full border" />
          </div>
          <div className="flex flex-col gap-4">
            <Typography variant="heading-4">What it will do</Typography>
            <Typography variant="base-regular">
              When you connect {connection.id} and Verida, your {connection.id}{" "}
              activities will automatically show up on Verida for all your
              friends to see. Additionally, {connection.item} and content shared
              via {connection.id} will automatically contribute to your Verida
              all-day stats like mentions and engagement.
            </Typography>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="primary">Connect</Button>
        </DialogFooter>
      </DialogContainer>
    </Dialog>
  )
}
