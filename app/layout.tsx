import type { Metadata } from "next"
import { Sora } from "next/font/google"

import "./globals.css"
import { Providers } from "./providers"

const sora = Sora({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Verida Vault",
  description: "Verida Vault",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={sora.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
