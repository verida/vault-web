"use client"

import { useMemo } from "react"

import { Typography } from "@/components/typography"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContainer,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { connections } from "@/features/connections"

export type DisconnectConnectionDialogProps = {
  isOpen: boolean
  onClose: () => void
  connectionId: string
}

export function DisconnectConnectionDialog(
  props: DisconnectConnectionDialogProps
) {
  const { isOpen, onClose, connectionId } = props

  const connection = useMemo(() => {
    return connections.find((c) => c.id === connectionId)
  }, [connectionId])

  if (!connection) {
    return null
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContainer>
        <AlertDialogHeader>
          <AlertDialogTitle>Disconnect from {connection.id}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogContent>
          <Typography variant="base-regular">
            Are you sure you want to disconnect?
          </Typography>
        </AlertDialogContent>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive">Disconnect</Button>
        </AlertDialogFooter>
      </AlertDialogContainer>
    </AlertDialog>
  )
}
