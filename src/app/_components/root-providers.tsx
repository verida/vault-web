"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={new QueryClient()}>
          <VeridaProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </VeridaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Suspense>
  )
}
