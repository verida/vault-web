"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { featureFlags } from "@/config/features"
import {
  getConnectionsSummaryLogsPageRoute,
  getConnectionsSummaryPageRoute,
} from "@/features/routes/utils"

export function ConnectionsSummaryNavTabs() {
  const pathname = usePathname()

  if (!featureFlags.dataConnections.logs.enabled) {
    // If the logs are not enabled, no point in showing the tabs
    return null
  }

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
ConnectionsSummaryNavTabs.displayName = "ConnectionsSummaryNavTabs"
