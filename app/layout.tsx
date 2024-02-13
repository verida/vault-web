import './globals.css'
import type { Metadata } from 'next'

import { Sora } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

const sora = Sora({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Verida Vault',
  description: 'Verida Vault',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={sora.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
