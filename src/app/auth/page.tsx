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
import { VeridaAuthConsentCard } from "@/features/verida-auth/components/verida-auth-consent-card"
import { VeridaAuthVeridaNotConnected } from "@/features/verida-auth/components/verida-auth-verida-not-connected"
import { useVeridaAuthRequest } from "@/features/verida-auth/hooks/use-verida-auth-request"
import { useVerida } from "@/features/verida/hooks/use-verida"

export default function AuthPage() {
  const { isConnected, isConnecting } = useVerida()
  const { status, payload } = useVeridaAuthRequest()

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
          hideAuthorizedApps={true}
        />
      </div>
      {status === "invalid" ? (
        <Card>
          <ErrorBlock>
            <ErrorBlockImage />
            <ErrorBlockTitle>Invalid Request</ErrorBlockTitle>
            <ErrorBlockDescription>
              The Verida Auth request is invalid or missing. Please try again or
              contact the requesting application.
            </ErrorBlockDescription>
          </ErrorBlock>
        </Card>
      ) : (
        <>
          {isConnected ? (
            <VeridaAuthConsentCard payload={payload} className="min-h-0" />
          ) : (
            <VeridaAuthVeridaNotConnected
              payload={payload}
              className="min-h-0"
            />
          )}
        </>
      )}
    </div>
  )
}
AuthPage.displayName = "AuthPage"
