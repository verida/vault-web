import { AppCommandDialog } from "@/app/(connected)/_components/app-command-dialog"
import { AppConnectionHandler } from "@/app/(connected)/_components/app-connection-handler"
import { AppHeader } from "@/app/(connected)/_components/app-header"
import { AppRestrictedProviders } from "@/app/(connected)/_components/app-restricted-providers"
import { AppUnrestrictedProviders } from "@/app/(connected)/_components/app-unrestricted-providers"
import { RestrictedAccessHandler } from "@/app/(connected)/_components/restricted-access-handler"
import { featureFlags } from "@/config/features"

export type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props

  return (
    <AppConnectionHandler>
      <AppUnrestrictedProviders>
        <div className="flex h-dvh flex-col bg-background">
          <AppHeader />
          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
            <main className="h-full w-full max-w-screen-2xl px-4 pb-0 pt-6 md:px-6 md:pt-10 xl:px-8">
              <RestrictedAccessHandler>
                <AppRestrictedProviders>{children}</AppRestrictedProviders>
              </RestrictedAccessHandler>
            </main>
          </div>
        </div>
        {featureFlags.commandDialog.enabled ? <AppCommandDialog /> : null}
      </AppUnrestrictedProviders>
    </AppConnectionHandler>
  )
}
AppLayout.displayName = "AppLayout"
