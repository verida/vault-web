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
          <div className="flex flex-1 flex-col items-center justify-center">
            <main className="w-full max-w-screen-2xl flex-1 overflow-y-auto px-4 pb-0 pt-6 md:px-6 md:pt-10 xl:px-8">
              {children}
            </main>
          </div>
        </div>
      </AppProviders>
    </AppConnectionHandler>
  )
}
