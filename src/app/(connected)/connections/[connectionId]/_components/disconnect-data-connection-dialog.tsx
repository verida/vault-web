"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

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
import { Typography } from "@/components/ui/typography"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import { useDisconnectDataConnection } from "@/features/data-connections/hooks/use-disconnect-data-connection"
import { DataConnection } from "@/features/data-connections/types"
import { getConnectionsSummaryPageRoute } from "@/features/routes/utils"
import { useToast } from "@/features/toasts/use-toast"

export type DisconnectDataConnectionDialogProps = {
  children: React.ReactNode
  connection: DataConnection
}

export function DisconnectDataConnectionDialog(
  props: DisconnectDataConnectionDialogProps
) {
  const { children, connection } = props

  const router = useRouter()

  const { toast } = useToast()

  const [status, setStatus] = useState<"idle" | "disconnecting" | "error">(
    "idle"
  )

  const { provider } = useDataProvider(connection.providerId)

  const { disconnectDataConnection } = useDisconnectDataConnection()

  const handleDisconnectClick = useCallback(() => {
    setStatus("disconnecting")
    disconnectDataConnection(
      {
        connectionId: connection._id,
      },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            description: `Your ${provider?.label ? `${provider.label} account` : "account"} has been disconnected`,
          })
          router.replace(getConnectionsSummaryPageRoute())
        },
        onError: () => {
          setStatus("error")
        },
      }
    )
  }, [connection, disconnectDataConnection, router, toast, provider?.label])

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
