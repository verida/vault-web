"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
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

  const [status, setStatus] = useState<"idle" | "disconnecting" | "error">(
    "idle"
  )

  const { provider } = useDataProvider(connection.provider)

  const { disconnectDataConnection } = useDisconnectDataConnection()

  const handleDisconnectClick = useCallback(() => {
    setStatus("disconnecting")
    disconnectDataConnection(
      {
        providerId: connection.provider,
        accountId: connection.providerId,
      },
      {
        onSuccess: () => {
          router.replace(getConnectionsSummaryPageRoute())
        },
        onError: () => {
          setStatus("error")
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
        <AlertDialogBody className="flex flex-col gap-4">
          <Typography variant="base-regular">
            Are you sure you want to disconnect?
          </Typography>
          {status === "error" ? (
            <Alert variant="error">
              <AlertDescription>
                There was an error disconnecting your account. Please try again
                later.
              </AlertDescription>
            </Alert>
          ) : null}
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDisconnectClick}
            disabled={status === "disconnecting"}
          >
            {status === "disconnecting" ? "Disconnecting..." : "Disconnect"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
DisconnectDataConnectionDialog.displayName = "DisconnectDataConnectionDialog"

export const DisconnectDataConnectionDialogTrigger = AlertDialogTrigger
