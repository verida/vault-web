"use client"

import { Typography } from "@/components/typography"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DataConnection, useDataProvider } from "@/features/data-connections"

export type DisconnectDataConnectionDialogProps = {
  children: React.ReactNode
  connection: DataConnection
}

export function DisconnectDataConnectionDialog(
  props: DisconnectDataConnectionDialogProps
) {
  const { children, connection } = props

  const { provider } = useDataProvider(connection.provider)

  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {provider?.label
              ? `Disconnect from ${provider.label}`
              : "Disconnect"}
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

export const DisconnectDataConnectionDialogTrigger = AlertDialogTrigger
