import type { Metadata, Viewport } from "next"

import { RootProviders } from "@/app/_components/root-providers"
import { BreakpointIndicator } from "@/components/breakpoint-indicator"
import { commonConfig } from "@/config/common"
import { APP_DESCRIPTION, APP_NAME, APP_TITLE } from "@/constants/app"
import { sora } from "@/styles/font"
import "@/styles/globals.css"
import { cn } from "@/styles/utils"

const baseUrl = new URL(commonConfig.BASE_URL)

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  metadataBase: baseUrl,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: baseUrl,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: {
      // TODO: Change this image url to update the image with proper one.
      url: `${baseUrl.toString()}images/inbox-page.png`,
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
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("h-dvh", sora.variable)}>
        <RootProviders>{children}</RootProviders>
        <BreakpointIndicator />
      </body>
    </html>
  )
}
RootLayout.displayName = "RootLayout"
