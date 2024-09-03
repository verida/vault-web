"use client"

import { useMemo } from "react"

import { Typography } from "@/components/typography"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MOCK_DATA_PROVIDERS } from "@/features/data-connections"

export type DisconnectDataConnectionDialogProps = {
  isOpen: boolean
  onClose: () => void
  connectionId: string
}

export function DisconnectDataConnectionDialog(
  props: DisconnectDataConnectionDialogProps
) {
  const { isOpen, onClose, connectionId } = props

  const connection = useMemo(() => {
    return MOCK_DATA_PROVIDERS.find((c) => c.name === connectionId)
  }, [connectionId])

  if (!connection) {
    return null
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Disconnect from {connection.label}
          </AlertDialogTitle>
          {/* TODO: Add description for accessibility */}
        </AlertDialogHeader>
        <AlertDialogBody>
          <Typography variant="base-regular">
            Are you sure you want to disconnect?
          </Typography>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive">Disconnect</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
DisconnectDataConnectionDialog.displayName = "DisconnectDataConnectionDialog"
