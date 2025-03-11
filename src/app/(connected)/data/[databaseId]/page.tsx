import { notFound } from "next/navigation"
import React from "react"

import { DataDestroyDatabaseDialog } from "@/app/(connected)/data/[databaseId]/_components/data-destroy-database-dialog"
import { DatabasePageContent } from "@/app/(connected)/data/[databaseId]/_components/database-page-content"
import { DeleteIcon } from "@/components/icons/delete-icon"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import { Button } from "@/components/ui/button"
import { featureFlags } from "@/config/features"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { getDataPageRoute } from "@/features/routes/utils"

export type DatabasePageProps = {
  params: { databaseId: string }
}

export default function DatabasePage(props: DatabasePageProps) {
  const { params } = props
  const { databaseId: encodedDatabaseId } = params
  const databaseId = decodeURIComponent(encodedDatabaseId)

  const databaseDefinition = USER_DATABASE_DEFS.find(
    (databaseDef) => databaseDef.id === databaseId
  )

  if (databaseDefinition) {
    return (
      <PageWrapper
        pageTitle={databaseDefinition.titlePlural}
        backNavigationHref={getDataPageRoute()}
        backNavigationLabel="Back to all Data"
        rightContent={
          featureFlags.data.db.destroy ? (
            <DataDestroyDatabaseDialog databaseDefinition={databaseDefinition}>
              <Button
                variant="outline-destructive"
                className="h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2"
              >
                <DeleteIcon className="size-5 shrink-0 sm:hidden" />
                <span className="sr-only sm:not-sr-only">Delete All</span>
              </Button>
            </DataDestroyDatabaseDialog>
          ) : undefined
        }
      >
        <DatabasePageContent
          databaseDefinition={databaseDefinition}
          className="flex-1"
        />
      </PageWrapper>
    )
  }

  notFound()
}
DatabasePage.displayName = "DatabasePage"
