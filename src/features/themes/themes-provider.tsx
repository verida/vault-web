"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export type ThemesProviderProps = {
  children: React.ReactNode
}

export function ThemesProvider(props: ThemesProviderProps) {
  const { children } = props

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
ThemesProvider.displayName = "ThemesProvider"
