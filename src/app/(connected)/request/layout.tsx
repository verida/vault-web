import { Metadata } from "next"

import { PageWrapper } from "@/components/page-wrapper"

export const metadata: Metadata = {
  title: "Request",
}

export interface RequestLayoutProps {
  children: React.ReactNode
}

export default function RequestLayout(props: RequestLayoutProps) {
  const { children } = props

  return <PageWrapper pageTitle="Requests">{children}</PageWrapper>
}
RequestLayout.displayName = "RequestLayout"
