import { AppConnectionHandler } from "@/app/(connected)/_components/app-connection-handler"
import { AppHeader } from "@/app/(connected)/_components/app-header"
import { AppProviders } from "@/app/(connected)/_components/app-providers"

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props

  return (
    <AppConnectionHandler>
      <AppProviders>
        <div className="flex h-dvh flex-col bg-background">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-6 pb-0 md:pt-10">
            {children}
          </main>
        </div>
      </AppProviders>
    </AppConnectionHandler>
  )
}
