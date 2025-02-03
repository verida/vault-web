import { notFound } from "next/navigation"

import { featureFlags } from "@/config/features"

export type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props

  if (!featureFlags.veridaAuth.enabled) {
    return notFound()
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
      {children}
    </div>
  )
}
AuthLayout.displayName = "AuthLayout"
