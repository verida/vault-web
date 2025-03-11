import type { Metadata, Viewport } from "next"
import { ReactNode } from "react"

import { Header } from "@/components/header/header"
import { RootProviders } from "@/components/root-providers"
import { commonConfig } from "@/config/common"
import { APP_DESCRIPTION, APP_NAME, APP_TITLE } from "@/constants/app"
import { CommandDialog } from "@/features/command/components/command-dialog"
import { BreakpointIndicator } from "@/features/dev/components/breakpoint-indicator"
import { ReactScan } from "@/features/dev/components/react-scan"
import { PlausibleScript } from "@/features/plausible/PlausibleScript"
import { sora } from "@/styles/font"
import "@/styles/globals.css"
import { cn } from "@/styles/utils"

const baseUrl = new URL(commonConfig.BASE_URL)

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s | ${APP_TITLE}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  metadataBase: baseUrl,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: baseUrl,
    images: {
      url: `${baseUrl.toString()}images/verida_vault_social_preview.png`,
      width: 1200,
      height: 630,
      alt: APP_NAME,
    },
    siteName: APP_NAME,
    type: "website",
  },
}

export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
  themeColor: "#FFFFFF",
}

export interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleScript />
      </head>
      <body className={cn("h-dvh", sora.variable)}>
        <RootProviders>
          <div className="flex h-dvh flex-col bg-background">
            <Header />
            <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
              <main className="h-full w-full max-w-screen-2xl px-4 pb-0 pt-6 md:px-6 md:pt-10 xl:px-8">
                {children}
              </main>
            </div>
          </div>
          <CommandDialog />
        </RootProviders>
        {commonConfig.DEV_MODE ? (
          <>
            <BreakpointIndicator />
            <ReactScan />
          </>
        ) : null}
      </body>
    </html>
  )
}
RootLayout.displayName = "RootLayout"
