"use client"

import { VeridaConnectionLoading } from "@/components/verida/verida-connection-loading"
import { OAuthConsentCard } from "@/features/verida-oauth/components/oauth-consent-card"
import { OAuthVeridaNotConnected } from "@/features/verida-oauth/components/oauth-verida-not-connected"
import { useVeridaOauth } from "@/features/verida-oauth/hooks/use-verida-oauth"

export default function OAuthPage() {
  const { isConnected, isConnecting, payload, handleAllow, handleDeny } =
    useVeridaOauth()

  if (payload && isConnected) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
        <OAuthConsentCard
          oauthPayload={payload}
          className="max-h-full"
          onAllow={handleAllow}
          onDeny={handleDeny}
        />
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

  // TODO: Handle case where no payload is available)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
      <OAuthVeridaNotConnected />
    </div>
  )
}
