"use client"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import { type ReactNode, Suspense } from "react"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CommandProvider } from "@/features/command/components/command-provider"
import { DataConnectionsBroadcastProvider } from "@/features/data-connections/components/data-connections-broadcast-provider"
import { QueriesProvider } from "@/features/queries/queries-provider"
import { RestrictedAccessProvider } from "@/features/restricted-access/components/restricted-access-provider"
import { ThemesProvider } from "@/features/themes/themes-provider"
import { VeridaInboxProvider } from "@/features/verida-inbox/components/verida-inbox-provider"
import { VeridaProvider } from "@/features/verida/components/verida-provider"

export interface RootProvidersProps {
  children: ReactNode
}

export function RootProviders(props: RootProvidersProps) {
  const { children } = props

  return (
    <Suspense>
      <NuqsAdapter>
        <ThemesProvider>
          <TooltipProvider>
            <QueriesProvider>
              <VeridaProvider>
                <RestrictedAccessProvider>
                  <DataConnectionsBroadcastProvider>
                    <VeridaInboxProvider>
                      <CommandProvider>{children}</CommandProvider>
                    </VeridaInboxProvider>
                  </DataConnectionsBroadcastProvider>
                </RestrictedAccessProvider>
              </VeridaProvider>
            </QueriesProvider>
            <Toaster />
          </TooltipProvider>
        </ThemesProvider>
      </NuqsAdapter>
    </Suspense>
  )
}
RootProviders.displayName = "RootProviders"
