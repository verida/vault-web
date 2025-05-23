"use client"

import { type ComponentProps, useCallback, useState } from "react"

import { RefreshIcon } from "@/components/icons/refresh-icon"
import { Button } from "@/components/ui/button"
import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"
import { useSyncAllDataConnections } from "@/features/data-connections/hooks/use-sync-all-data-connections"
import { useToast } from "@/features/toasts/use-toast"
import { cn } from "@/styles/utils"
import { wait } from "@/utils/misc"

export interface SyncAllConnectionsButtonProps
  extends Pick<ComponentProps<typeof Button>, "className" | "disabled"> {}

export function SyncAllConnectionsButton(props: SyncAllConnectionsButtonProps) {
  const { className, disabled } = props

  const [isSyncing, setIsSyncing] = useState(false)
  const { toast } = useToast()
  const { connections } = useDataConnections()

  const { syncAllConnections } = useSyncAllDataConnections()

  const handleClick = useCallback(() => {
    setIsSyncing(true)
    syncAllConnections({} as unknown as void, {
      onSettled: () => {
        wait(1000 * 4).then(() => {
          setIsSyncing(false)
        })
      },
      onSuccess: () => {
        toast({
          variant: "success",
          description: "Data connections are synchronizing",
        })
      },
      onError: () => {
        toast({
          variant: "error",
          description: "There was an error synchronizing the data connections",
        })
      },
    })
  }, [syncAllConnections, toast])

  if (connections && connections.length > 0) {
    return (
      <Button
        variant="outline"
        className={cn("h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2", className)}
        disabled={isSyncing || disabled}
        onClick={handleClick}
      >
        <RefreshIcon className="size-5 sm:hidden" />
        <span className="sr-only sm:not-sr-only">Sync All</span>
      </Button>
    )
  }

  return null
}
SyncAllConnectionsButton.displayName = "SyncAllConnectionsButton"
