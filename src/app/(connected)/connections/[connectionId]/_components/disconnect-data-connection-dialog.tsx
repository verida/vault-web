"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

import { Typography } from "@/components/typography"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DataConnection,
  useDataProvider,
  useDisconnectDataConnection,
} from "@/features/data-connections"
import { getConnectionsSummaryPageRoute } from "@/features/routes/utils"

export type DisconnectDataConnectionDialogProps = {
  children: React.ReactNode
  connection: DataConnection
}

export function DisconnectDataConnectionDialog(
  props: DisconnectDataConnectionDialogProps
) {
  const { children, connection } = props

  const router = useRouter()

  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const { provider } = useDataProvider(connection.provider)

  const { disconnectDataConnection } = useDisconnectDataConnection()

  const handleDisconnectClick = useCallback(() => {
    setIsDisconnecting(true)
    disconnectDataConnection(
      {
        providerId: connection.provider,
        accountId: connection.providerId,
      },
      {
        onSettled: () => {
          setIsDisconnecting(false)
        },
        onSuccess: () => {
          router.replace(getConnectionsSummaryPageRoute())
        },
        onError: () => {
          // TODO: Error handling in the UI
        },
      }
    )
  }, [
    connection.provider,
    connection.providerId,
    disconnectDataConnection,
    router,
  ])

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
          <AlertDialogDescription
            // Description added for accessibility purposes
            className="hidden"
          >
            Disconnect your account
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Typography variant="base-regular">
            Are you sure you want to disconnect?
          </Typography>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDisconnectClick}
            disabled={isDisconnecting}
          >
            {isDisconnecting ? "Disconnecting..." : "Disconnect"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
DisconnectDataConnectionDialog.displayName = "DisconnectDataConnectionDialog"

export const DisconnectDataConnectionDialogTrigger = AlertDialogTrigger
