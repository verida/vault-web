"use client"

import { type ReactNode, useCallback, useState } from "react"

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
import type { DatabaseDefinition } from "@/features/data/types"
import { useToast } from "@/features/toasts/use-toast"
import { useDestroyVeridaDatabase } from "@/features/verida-database/hooks/use-destroy-verida-database"

export interface DataDestroyDatabaseDialogProps {
  children: ReactNode
  databaseDefinition: DatabaseDefinition
}

export function DataDestroyDatabaseDialog(
  props: DataDestroyDatabaseDialogProps
) {
  const { children, databaseDefinition } = props

  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle")

  const { destroyDatabase } = useDestroyVeridaDatabase()

  const handleProcessClick = useCallback(() => {
    setStatus("processing")
    destroyDatabase(
      {
        databaseName: databaseDefinition.databaseVaultName,
      },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            description: "All data items successfully deleted",
          })
          setOpen(false)
        },
        onError: () => {
          setStatus("error")
          toast({
            variant: "error",
            description: "Something went wrong while deleting all data items",
          })
          setOpen(false)
        },
      }
    )
  }, [databaseDefinition, destroyDatabase, toast])

  if (!featureFlags.data.db.destroy) {
    return null
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete All Data</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <AlertDialogDescription>
            Are you sure you want to delete all data items of this type?
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
DataDestroyDatabaseDialog.displayName = "DataDestroyDatabaseDialog"
