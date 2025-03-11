"use client"

import { type ReactNode, useCallback, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/features/toasts/use-toast"
import { useRevokeVeridaAuthToken } from "@/features/verida-auth/hooks/use-revoke-verida-auth-token"
import type { VeridaAuthToken } from "@/features/verida-auth/types"

export interface RevokeAuthorizedAppDialogProps {
  authToken: VeridaAuthToken
  onRevoke?: () => void
  children?: ReactNode
}

export function RevokeAuthorizedAppDialog(
  props: RevokeAuthorizedAppDialogProps
) {
  const { authToken, onRevoke, children } = props
  const { revokeAuthToken } = useRevokeVeridaAuthToken()
  const { toast } = useToast()
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle")

  const handleRevoke = useCallback(async () => {
    if (!authToken._id) return

    setStatus("processing")
    revokeAuthToken(
      { tokenId: authToken._id },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            description: "Access successfully revoked",
          })
          onRevoke?.()
        },
        onError: () => {
          setStatus("error")
          toast({
            variant: "error",
            description: "Something went wrong while revoking access",
          })
        },
      }
    )
  }, [authToken._id, revokeAuthToken, onRevoke, toast])

  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke Access</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to revoke access for this application?
          </AlertDialogDescription>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleRevoke}
            disabled={status === "processing"}
          >
            {status === "processing" ? "Revoking..." : "Revoke"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
RevokeAuthorizedAppDialog.displayName = "RevokeAuthorizedAppDialog"

export const RevokeAuthorizedAppDialogTrigger = AlertDialogTrigger
