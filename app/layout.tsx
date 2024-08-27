import type { Metadata } from "next"
import { Sora } from "next/font/google"

import { config } from "@/config"
import { APP_DESCRIPTION, APP_NAME, APP_TITLE } from "@/constants/app"
import { cn } from "@/lib/utils"

import "./globals.css"
import { Providers } from "./providers"

const sora = Sora({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  openGraph: {
    url: config.baseUrl,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: {
      // TODO: Change this image url to update the image with proper one.
      url: `${config.baseUrl}/images/inbox-page.png`,
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
