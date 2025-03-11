import { type Metadata } from "next"
import { type ReactNode } from "react"

import { PageWrapper } from "@/components/layouts/page-wrapper"

export const metadata: Metadata = {
  title: "Profile",
}

export interface ProfileLayoutProps {
  children: ReactNode
}

export default function ProfileLayout(props: ProfileLayoutProps) {
  const { children } = props

  return <PageWrapper pageTitle="Profile">{children}</PageWrapper>
}
ProfileLayout.displayName = "ProfileLayout"
