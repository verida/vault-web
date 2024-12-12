"use client"

import Image from "next/image"

import { VeridaConnectionLoading } from "@/components/verida/verida-connection-loading"
import { VeridaIdentityDropdownMenu } from "@/components/verida/verida-identity-dropdown-menu"
import { OAuthConsentCard } from "@/features/verida-oauth/components/oauth-consent-card"
import { OAuthVeridaNotConnected } from "@/features/verida-oauth/components/oauth-verida-not-connected"
import { useVerida } from "@/features/verida/hooks/use-verida"

export default function OAuthPage() {
  const { isConnected, isConnecting } = useVerida()

  if (isConnecting) {
    return <VeridaConnectionLoading />
  }

  return (
    <div className="flex max-h-full w-full max-w-3xl flex-col gap-2">
      <div className="flex shrink-0 flex-row items-center justify-between">
        <div className="flex shrink-0 flex-row items-center">
          <Image
            src="/logo.svg"
            alt="Verida Vault Logo"
            height={32}
            width={95}
          />
        </div>
        <VeridaIdentityDropdownMenu
          keepExpanded
          hideDisconnect={false}
          hideFeedback={false}
        />
      </div>
      {isConnected ? (
        <OAuthConsentCard className="min-h-0" />
      ) : (
        <OAuthVeridaNotConnected className="min-h-0" />
      )}
    </div>
  )
}
