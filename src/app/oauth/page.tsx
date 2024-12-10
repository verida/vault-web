"use client"

import { VeridaConnectionLoading } from "@/components/verida/verida-connection-loading"
import { OAuthConsentCard } from "@/features/verida-oauth/components/oauth-consent-card"
import { OAuthVeridaNotConnected } from "@/features/verida-oauth/components/oauth-verida-not-connected"
import { useVerida } from "@/features/verida/hooks/use-verida"

export default function OAuthPage() {
  const { isConnected, isConnecting } = useVerida()

  if (isConnected) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
        <OAuthConsentCard className="max-h-full" />
      </div>
    )
  }

  if (isConnecting) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
        <VeridaConnectionLoading />
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
      <OAuthVeridaNotConnected />
    </div>
  )
}
