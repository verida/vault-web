import Link from "next/link"
import React from "react"

import { DatabaseCard } from "@/app/(connected)/data/_components/database-card"
import { Typography } from "@/components/typography"
import { DATABASE_DEFS } from "@/features/data"
import { getDatabasePageRoute } from "@/features/routes/utils"

export default function DataPage() {
  return (
    <div className="flex-col">
      <Typography variant="heading-3" className="mb-4">
        Categories
      </Typography>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {DATABASE_DEFS.map((databaseDefinition) => {
          return (
            <article key={databaseDefinition.id}>
              <Link
                href={getDatabasePageRoute({
                  databaseId: databaseDefinition.id,
                })}
                className="rounded-2xl"
              >
                <DatabaseCard databaseDefinition={databaseDefinition} />
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
DataPage.displayName = "DataPage"
