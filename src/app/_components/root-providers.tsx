"use client"

import { Suspense } from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import { DataConnectionsProvider } from "@/features/data-connections"
import { QueriesProvider } from "@/features/queries/queries-provider"
import { ThemesProvider } from "@/features/themes/themes-provider"
import { VeridaProvider } from "@/features/verida"

export type RootProvidersProps = {
  children: React.ReactNode
}

export function RootProviders(props: RootProvidersProps) {
  const { children } = props

  // Put global providers that are required in both cases (connected and disconnected user).
  // For providers requiring the user to be connected, use the AppProviders component instead.
  return (
    <Suspense>
      <ThemesProvider>
        <TooltipProvider>
          <QueriesProvider>
            <VeridaProvider>
              <DataConnectionsProvider>{children}</DataConnectionsProvider>
            </VeridaProvider>
          </QueriesProvider>
        </TooltipProvider>
      </ThemesProvider>
    </Suspense>
  )
}
