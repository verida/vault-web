import { notFound } from "next/navigation"

import { featureFlags } from "@/config/features"

type OAuthLayoutProps = {
  children: React.ReactNode
}

export default function OAuthLayout(props: OAuthLayoutProps) {
  const { children } = props

  if (!featureFlags.veridaOauth.enabled) {
    return notFound()
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
      {children}
    </div>
  )
}
OAuthLayout.displayName = "OAuthLayout"
