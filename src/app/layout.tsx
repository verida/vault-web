import type { Metadata, Viewport } from "next"

import { RootProviders } from "@/app/_components/root-providers"
import { commonConfig } from "@/config/common"
import { APP_DESCRIPTION, APP_NAME, APP_TITLE } from "@/constants/app"
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

export type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleScript />
      </head>
      <body className={cn("h-dvh", sora.variable)}>
        <RootProviders>{children}</RootProviders>
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
