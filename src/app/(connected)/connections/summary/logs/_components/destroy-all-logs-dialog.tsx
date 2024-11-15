"use client"

import { useCallback, useState } from "react"

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
import { featureFlags } from "@/config/features"
import { DATA_CONNECTIONS_SYNC_LOGS_DATABASE_NAME } from "@/features/data-connections/constants"
import { useToast } from "@/features/toasts/use-toast"
import { useDestroyVeridaDatabase } from "@/features/verida-database/hooks/use-destroy-verida-database"

export type DestroyAllLogsDialogProps = {
  children: React.ReactNode
}

export function DestroyAllLogsDialog(props: DestroyAllLogsDialogProps) {
  const { children } = props

  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle")

  const { destroyDatabase } = useDestroyVeridaDatabase()

  const handleProcessClick = useCallback(() => {
    setStatus("processing")
    destroyDatabase(
      {
        databaseName: DATA_CONNECTIONS_SYNC_LOGS_DATABASE_NAME,
      },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            description: "Connection logs successfully deleted",
          })
          setOpen(false)
        },
        onError: () => {
          setStatus("error")
          toast({
            variant: "error",
            description:
              "Something went wrong while deleting the connection logs",
          })
          setOpen(false)
        },
      }
    )
  }, [destroyDatabase, toast])

  if (!featureFlags.dataConnections.logs.destroy) {
    return null
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete All Logs</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <AlertDialogDescription>
            Are you sure you want to delete all the data connection logs?
          </AlertDialogDescription>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleProcessClick}
            disabled={status === "processing"}
          >
            {status === "processing" ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
DestroyAllLogsDialog.displayName = "DestroyAllLogsDialog"
