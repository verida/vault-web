"use client"

import Link from "next/link"
import { ReactNode } from "react"

import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useData } from "@/features/data/hooks"

export type CategoryCardProps = {
  icon?: ReactNode
  title?: string
  href?: string
  database: string
}

export function CategoryCard(props: CategoryCardProps) {
  const { icon, title, href, database } = props

  const { dataItemsCount, isDataItemsCountPending } = useData(database)

  return (
    <Link href={href || "#"}>
      <Card className="rounded-2xl shadow-card">
        <CardContent className="p-6">
          {icon && icon}
          {title && (
            <Typography variant="heading-4" className="mt-6">
              {title}
            </Typography>
          )}
          {isDataItemsCountPending ? (
            <Skeleton className="h-[23px] w-20" />
          ) : (
            <Typography
              variant="base-l"
              className="mt-1 h-[23px] text-muted-foreground"
            >
              {dataItemsCount} items
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
