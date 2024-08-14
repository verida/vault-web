import type { Metadata } from "next"
import { Sora } from "next/font/google"
import Head from "next/head"

import {
  VERIDA_VAULT_DESCRIPTION,
  VERIDA_VAULT_HERO_IMAGE,
  VERIDA_VAULT_TITLE,
} from "@/features/verida"

import "./globals.css"
import { Providers } from "./providers"

const sora = Sora({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: VERIDA_VAULT_TITLE,
  description: VERIDA_VAULT_DESCRIPTION,
  openGraph: {
    title: VERIDA_VAULT_TITLE,
    description: VERIDA_VAULT_DESCRIPTION,
    images: [VERIDA_VAULT_HERO_IMAGE],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="keywords" content="verida, vault" />
      </Head>
      <body className={sora.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
