"use client"

import Image from "next/image"

import { VeridaConnectionLoading } from "@/components/verida/verida-connection-loading"
import { VeridaIdentityDropdownMenu } from "@/components/verida/verida-identity-dropdown-menu"
import { VeridaAuthConsentCard } from "@/features/verida-auth/components/verida-auth-consent-card"
import { VeridaAuthInvalidRequestCard } from "@/features/verida-auth/components/verida-auth-invalid-request-card"
import { VeridaAuthProcessingRequestCard } from "@/features/verida-auth/components/verida-auth-processing-request-card"
import { VeridaAuthVeridaNotConnectedCard } from "@/features/verida-auth/components/verida-auth-verida-not-connected-card"
import { useVeridaAuthRequest } from "@/features/verida-auth/hooks/use-verida-auth-request"
import { useVerida } from "@/features/verida/hooks/use-verida"

export default function AuthPage() {
  const { isConnected, isConnecting } = useVerida()
  const request = useVeridaAuthRequest()

  if (request.status !== "processing" && isConnecting) {
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
      {request.status === "processing" ? (
        <VeridaAuthProcessingRequestCard />
      ) : request.status === "valid" ? (
        <>
          {isConnected ? (
            <VeridaAuthConsentCard request={request} className="min-h-0" />
          ) : (
            <VeridaAuthVeridaNotConnectedCard
              request={request}
              className="min-h-0"
            />
          )}
        </>
      ) : (
        <VeridaAuthInvalidRequestCard request={request} />
      )}
    </div>
  )
}
AuthPage.displayName = "AuthPage"
