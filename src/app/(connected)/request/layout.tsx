import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

import { PageWrapper } from "@/components/layouts/page-wrapper"
import { featureFlags } from "@/config/features"

export const metadata: Metadata = {
  title: "Request",
}

export interface RequestLayoutProps {
  children: ReactNode
}

export default function RequestLayout(props: RequestLayoutProps) {
  const { children } = props

  if (!featureFlags.requests.enabled) {
    notFound()
  }

  return <PageWrapper pageTitle="Requests">{children}</PageWrapper>
}
RequestLayout.displayName = "RequestLayout"
