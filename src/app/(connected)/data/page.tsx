import Link from "next/link"
import React from "react"

import { DatabaseCard } from "@/app/(connected)/data/_components/database-card"
import { PageWrapper } from "@/components/page-wrapper"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { getDatabasePageRoute } from "@/features/routes/utils"

export default function DataPage() {
  return (
    <PageWrapper pageTitle="Data">
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
