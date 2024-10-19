import { notFound } from "next/navigation"
import React from "react"

import { DatabasePageContent } from "@/app/(connected)/data/[databaseId]/_components/database-page-content"
import { PageWrapper } from "@/components/page-wrapper"
import { DATABASE_DEFS } from "@/features/data/constants"
import { getDataPageRoute } from "@/features/routes/utils"

export type DatabasePageProps = {
  params: { databaseId: string }
}

export default function DatabasePage(props: DatabasePageProps) {
  const { params } = props
  const { databaseId: encodedDatabaseId } = params
  const databaseId = decodeURIComponent(encodedDatabaseId)

  const databaseDefinition = DATABASE_DEFS.find(
    (databaseDef) => databaseDef.id === databaseId
  )

  if (databaseDefinition) {
    return (
      <PageWrapper
        pageTitle={databaseDefinition.titlePlural}
        backNavigationHref={getDataPageRoute()}
        backNavigationLabel="Back to all Data"
      >
        <DatabasePageContent databaseDefinition={databaseDefinition} />
      </PageWrapper>
    )
  }

  notFound()
}
DatabasePage.displayName = "DatabasePage"
