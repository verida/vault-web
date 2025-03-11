import { notFound } from "next/navigation"
import { ReactNode } from "react"

import { DestroyAllLogsDialog } from "@/app/(connected)/connections/summary/logs/_components/destroy-all-logs-dialog"
import { DeleteIcon } from "@/components/icons/delete-icon"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import { Button } from "@/components/ui/button"
import { featureFlags } from "@/config/features"

export interface ConnectionsLogsLayoutProps {
  children: ReactNode
}

export default function ConnectionsLogsLayout(
  props: ConnectionsLogsLayoutProps
) {
  const { children } = props

  if (!featureFlags.dataConnections.logs.enabled) {
    notFound()
  }

  return (
    <PageWrapper
      pageTitle="Connection Logs"
      rightContent={
        featureFlags.dataConnections.logs.destroy ? (
          <DestroyAllLogsDialog>
            <Button
              variant="outline-destructive"
              className="h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2"
            >
              <DeleteIcon className="size-5 shrink-0 sm:hidden" />
              <span className="sr-only sm:not-sr-only">Delete All</span>
            </Button>
          </DestroyAllLogsDialog>
        ) : undefined
      }
    >
      {children}
    </PageWrapper>
  )
}
ConnectionsLogsLayout.displayName = "ConnectionsLogsLayout"
