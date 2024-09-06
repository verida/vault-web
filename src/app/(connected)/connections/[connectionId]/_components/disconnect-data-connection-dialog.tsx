"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

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
import {
  DataConnection,
  useDataProvider,
  useDisconnectDataConnection,
} from "@/features/data-connections"
import { getConnectionsSummaryPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("DisconnectDataConnectionDialog")

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

  const handleDisconnectClick = useCallback(async () => {
    setIsDisconnecting(true)
    try {
      await disconnectDataConnection({
        providerId: connection.provider,
        accountId: connection.providerId,
      })

      router.replace(getConnectionsSummaryPageRoute())
    } catch (error) {
      // TODO: Error handling in the UI

      logger.warn("Error disconnecting data connection")
    } finally {
      setIsDisconnecting(false)
    }
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
          {/* TODO: Add description for accessibility */}
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
