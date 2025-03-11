"use client"

import { useRouter } from "next/navigation"
import { ReactNode, useCallback, useState } from "react"

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
import { DatabaseDefinition } from "@/features/data/types"
import { getDatabasePageRoute } from "@/features/routes/utils"
import { useToast } from "@/features/toasts/use-toast"
import { useDeleteVeridaRecord } from "@/features/verida-database/hooks/use-delete-verida-record"

export interface DataDeleteRecordDialogProps {
  children: ReactNode
  databaseDefinition: DatabaseDefinition
  recordId: string
}

export function DataDeleteRecordDialog(props: DataDeleteRecordDialogProps) {
  const { children, databaseDefinition, recordId } = props

  const router = useRouter()

  const { toast } = useToast()

  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle")

  const { deleteRecord } = useDeleteVeridaRecord()

  const handleProcessClick = useCallback(() => {
    setStatus("processing")
    deleteRecord(
      {
        databaseName: databaseDefinition.databaseVaultName,
        recordId,
      },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            description: "Data item successfully deleted",
          })
          router.replace(
            getDatabasePageRoute({ databaseId: databaseDefinition.id })
          )
        },
        onError: () => {
          setStatus("error")
          toast({
            variant: "error",
            description: "Something went wrong while deleting the data item",
          })
        },
      }
    )
  }, [recordId, databaseDefinition, deleteRecord, router, toast])

  if (!featureFlags.data.record.delete) {
    return null
  }

  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Data Item</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <AlertDialogDescription>
            Are you sure you want to delete this data item?
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
DataDeleteRecordDialog.displayName = "DataDeleteRecordDialog"

export const DataDeleteRecordDialogTrigger = AlertDialogTrigger
