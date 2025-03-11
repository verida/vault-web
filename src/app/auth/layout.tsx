import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import { featureFlags } from "@/config/features"

export interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props

  if (!featureFlags.veridaAuth.enabled) {
    return notFound()
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-8">
      {children}
    </div>
  )
}
AuthLayout.displayName = "AuthLayout"
