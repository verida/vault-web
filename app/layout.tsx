import type { Metadata } from "next"
import { Sora } from "next/font/google"

import { config } from "@/config"
import { APP_DESCRIPTION, APP_NAME, APP_TITLE } from "@/constants/app"

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
      url: `${config.baseUrl}/images/inbox-page.png`,
      width: 1200,
      height: 630,
      alt: APP_NAME,
    },
    siteName: APP_NAME,
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sora.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
