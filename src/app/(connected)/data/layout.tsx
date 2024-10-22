import { notFound } from "next/navigation"

import { featureFlags } from "@/config/features"

type DataLayoutProps = {
  children: React.ReactNode
}

export default function DataLayout(props: DataLayoutProps) {
  const { children } = props

  if (!featureFlags.data.enabled) {
    notFound()
  }

  return <>{children}</>
}
DataLayout.displayName = "DataLayout"
