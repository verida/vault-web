import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTitle,
} from "@/components/ui/empty-state"
import { AppCard } from "@/features/apps-marketplace/components/app-card"
import { getMarketplaceApps } from "@/features/apps-marketplace/utils"

export async function AppsList() {
  const apps = await getMarketplaceApps()

  if (apps.length === 0) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <EmptyState>
          <EmptyStateImage />
          <EmptyStateTitle>No applications yet</EmptyStateTitle>
          <EmptyStateDescription>
            There are no applications yet. Check back later for updates.
          </EmptyStateDescription>
        </EmptyState>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apps.map((app) => (
        <li key={app.id}>
          <AppCard app={app} className="h-full" />
        </li>
      ))}
    </ul>
  )
}
AppsList.displayName = "AppsList"
