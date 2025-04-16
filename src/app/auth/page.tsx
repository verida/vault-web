"use client"

import { VeridaConnectionLoading } from "@/components/verida/verida-connection-loading"
import { VeridaAuthConsentCard } from "@/features/verida-auth/components/verida-auth-consent-card"
import { VeridaAuthErrorRequestCard } from "@/features/verida-auth/components/verida-auth-error-request-card"
import { VeridaAuthInvalidRequestCard } from "@/features/verida-auth/components/verida-auth-invalid-request-card"
import { VeridaAuthProcessingRequestCard } from "@/features/verida-auth/components/verida-auth-processing-request-card"
import { VeridaAuthVeridaNotConnectedCard } from "@/features/verida-auth/components/verida-auth-verida-not-connected-card"
import { useVeridaAuthRequest } from "@/features/verida-auth/hooks/use-verida-auth-request"
import { useVerida } from "@/features/verida/hooks/use-verida"

export default function AuthPage() {
  const { status } = useVerida()
  const request = useVeridaAuthRequest()

  if (request.status !== "processing" && status === "connecting") {
    return <VeridaConnectionLoading />
  }

  return (
    <div className="flex max-h-full w-full max-w-3xl flex-col gap-2">
      {request.status === "processing" ? (
        <VeridaAuthProcessingRequestCard className="h-full min-h-0" />
      ) : request.status === "valid" ? (
        <>
          {status === "connected" ? (
            <VeridaAuthConsentCard
              request={request}
              className="h-full min-h-0"
            />
          ) : (
            <VeridaAuthVeridaNotConnectedCard
              request={request}
              className="h-full min-h-0"
            />
          )}
        </>
      ) : request.status === "error" ? (
        <VeridaAuthErrorRequestCard
          request={request}
          className="h-full min-h-0"
        />
      ) : (
        <VeridaAuthInvalidRequestCard request={request} />
      )}
    </div>
  )
}
AuthPage.displayName = "AuthPage"
