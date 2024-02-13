'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { VeridaProvider } from "@/features/verida"


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <VeridaProvider>
        {children}
      </VeridaProvider>
    </ThemeProvider>
  )
}
