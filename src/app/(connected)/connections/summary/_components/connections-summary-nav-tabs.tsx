"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getConnectionsSummaryLogsPageRoute,
  getConnectionsSummaryPageRoute,
} from "@/features/routes/utils"

export function ConnectionsSummaryNavTabs() {
  const pathname = usePathname()

  return (
    <Tabs>
      <TabsList className="grid w-full grid-cols-2 sm:w-fit">
        <TabsTrigger
          value="connections"
          data-state={
            pathname === getConnectionsSummaryPageRoute()
              ? "active"
              : "inactive"
          }
          asChild
        >
          <Link href={getConnectionsSummaryPageRoute()}>Connections</Link>
        </TabsTrigger>
        <TabsTrigger
          value="connections-logs"
          data-state={
            pathname === getConnectionsSummaryLogsPageRoute()
              ? "active"
              : "inactive"
          }
          asChild
        >
          <Link href={getConnectionsSummaryLogsPageRoute()}>
            Connections Logs
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
