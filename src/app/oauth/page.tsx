"use client"

import Image from "next/image"

import { Card } from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { VeridaConnectionLoading } from "@/components/verida/verida-connection-loading"
import { VeridaIdentityDropdownMenu } from "@/components/verida/verida-identity-dropdown-menu"
import { OAuthConsentCard } from "@/features/verida-oauth/components/oauth-consent-card"
import { OAuthVeridaNotConnected } from "@/features/verida-oauth/components/oauth-verida-not-connected"
import { useVeridaOauthRequest } from "@/features/verida-oauth/hooks/use-verida-oauth-request"
import { useVerida } from "@/features/verida/hooks/use-verida"

export default function OAuthPage() {
  const { isConnected, isConnecting } = useVerida()
  const { status, payload } = useVeridaOauthRequest()

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
          hideApiKeys={true}
        />
      </div>
      {status === "invalid" ? (
        <Card>
          <ErrorBlock>
            <ErrorBlockImage />
            <ErrorBlockTitle>Invalid OAuth Request</ErrorBlockTitle>
            <ErrorBlockDescription>
              The OAuth request is invalid or missing. Please try again or
              contact the requesting application.
            </ErrorBlockDescription>
          </ErrorBlock>
        </Card>
      ) : (
        <>
          {isConnected ? (
            <OAuthConsentCard payload={payload} className="min-h-0" />
          ) : (
            <OAuthVeridaNotConnected payload={payload} className="min-h-0" />
          )}
        </>
      )}
    </div>
  )
}
