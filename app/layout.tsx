import type { Metadata } from "next"
import { Sora } from "next/font/google"

import { RootProviders } from "@/app/_components/root-providers"
import { serverConfig } from "@/config/server"
import { APP_DESCRIPTION, APP_NAME, APP_TITLE } from "@/constants/app"
import { cn } from "@/lib/utils"

import "./globals.css"

const sora = Sora({ subsets: ["latin"] })

const baseUrl = serverConfig.BASE_URL

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: baseUrl,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: {
      // TODO: Change this image url to update the image with proper one.
      url: `${baseUrl}/images/inbox-page.png`,
      width: 1200,
      height: 630,
      alt: APP_NAME,
    },
    siteName: APP_NAME,
    type: "website",
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("h-dvh", sora.className)}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
