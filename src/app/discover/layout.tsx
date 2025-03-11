import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

import { PageWrapper } from "@/components/layouts/page-wrapper"
import { Typography } from "@/components/ui/typography"
import { featureFlags } from "@/config/features"

export const metadata: Metadata = {
  title: "Discover",
}

export interface DiscoverLayoutProps {
  children: ReactNode
}

export default function DiscoverLayout(props: DiscoverLayoutProps) {
  const { children } = props

  if (!featureFlags.appsMarketplace.enabled) {
    notFound()
  }

  return (
    <PageWrapper pageTitle="Discover">
      <div className="flex flex-1 flex-col gap-8">
        <div className="text-muted-foreground">
          <Typography>
            Discover third-party applications that integrate with Verida to
            enhance your experience.
          </Typography>
        </div>
        {children}
      </div>
    </PageWrapper>
  )
}
DiscoverLayout.displayName = "DiscoverLayout"
