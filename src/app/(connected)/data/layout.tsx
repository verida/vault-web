import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { type ReactNode } from "react"

import { featureFlags } from "@/config/features"

export const metadata: Metadata = {
  title: "Data",
}

export interface DataLayoutProps {
  children: ReactNode
}

export default function DataLayout(props: DataLayoutProps) {
  const { children } = props

  if (!featureFlags.data.enabled) {
    notFound()
  }

  return <>{children}</>
}
DataLayout.displayName = "DataLayout"
