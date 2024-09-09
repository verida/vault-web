import React from "react"

import { CategoryCard } from "@/app/(connected)/data/_components/category-card"
import { Typography } from "@/components/typography"
import { databaseDefinitions } from "@/features/data"

export default function DataPage() {
  return (
    <div className="flex-col">
      <Typography variant="heading-3" className="mb-4">
        Categories
      </Typography>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {databaseDefinitions.map((database) => {
          return (
            <article key={database.name}>
              <CategoryCard
                icon={database.icon}
                database={database.database || ""}
                href={`/data/${database.name}`}
                title={database.titlePlural}
              />
            </article>
          )
        })}
      </div>
    </div>
  )
}
DataPage.displayName = "DataPage"
