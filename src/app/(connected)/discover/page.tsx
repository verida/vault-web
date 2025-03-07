import { Suspense } from "react"

import { AppsList } from "@/features/apps-marketplace/components/apps-list"
import { AppsListSkeleton } from "@/features/apps-marketplace/components/apps-list-skeleton"

export const dynamic = "force-dynamic"

export default function MarketplacePage() {
  return (
    <Suspense fallback={<AppsListSkeleton />}>
      <AppsList />
    </Suspense>
  )
}
MarketplacePage.displayName = "MarketplacePage"
