import Link from "next/link"
import React from "react"

import { DataSecurityDetailsPopover } from "@/app/(connected)/data/_components/data-security-details-popover"
import { DatabaseCard } from "@/app/(connected)/data/_components/database-card"
import { PageWrapper } from "@/components/page-wrapper"
import { Typography } from "@/components/typography"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { getDatabasePageRoute } from "@/features/routes/utils"

export default function DataPage() {
  return (
    <PageWrapper
      pageTitle={
        <div className="flex flex-row items-center gap-4">
          <Typography variant="heading-3">Data</Typography>
          <DataSecurityDetailsPopover />
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
        {USER_DATABASE_DEFS.map((databaseDefinition) => {
          return (
            <article key={databaseDefinition.id}>
              <Link
                href={getDatabasePageRoute({
                  databaseId: databaseDefinition.id,
                })}
                className="rounded-2xl"
              >
                <DatabaseCard
                  databaseDefinition={databaseDefinition}
                  className="h-full"
                />
              </Link>
            </article>
          )
        })}
      </div>
    </PageWrapper>
  )
}
DataPage.displayName = "DataPage"
