"use client"

import { Typography } from "@/components/typography"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import {
  SuccessBlock,
  SuccessBlockDescription,
  SuccessBlockImage,
  SuccessBlockTitle,
} from "@/components/ui/success"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"
import { useVerida } from "@/features/verida/hooks/use-verida"

export default function OnboardingConnectVaultPage() {
  const { isConnecting, isConnected } = useVerida()

  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Connect to Verida Vault"
        description="Use your Verida Identity to connect to this application."
      />
      <OnboardingCardBody>
        {isConnected ? (
          <SuccessBlock>
            <SuccessBlockImage />
            <SuccessBlockTitle>Connected!</SuccessBlockTitle>
            <SuccessBlockDescription>
              You are now connected to the Verida Vault with your Verida
              identity.
            </SuccessBlockDescription>
            <SuccessBlockDescription>
              Go to the next step
            </SuccessBlockDescription>
          </SuccessBlock>
        ) : isConnecting ? (
          <LoadingBlock>
            <LoadingBlockSpinner />
            <LoadingBlockTitle>Connecting to Verida...</LoadingBlockTitle>
            <LoadingBlockDescription>
              Please wait while we establish a secure connection. This might
              take a moment.
            </LoadingBlockDescription>
          </LoadingBlock>
        ) : (
          <div className="flex flex-col gap-8">
            <ol className="flex list-inside list-decimal flex-col gap-1">
              <li>
                <Typography component="span">
                  {`Click on the "Connect with Verida" button below`}
                </Typography>
              </li>
              <li>
                <Typography component="span">
                  Open the Verida Wallet app on your mobile device and scan the
                  QR code displayed. Alternatively, on mobile device simply
                  click the displayed button to open the Verida Wallet directly
                </Typography>
              </li>
              <li>
                <Typography component="span">
                  Approve the connection request in your Verida Wallet
                </Typography>
              </li>
            </ol>
            <VeridaConnectButton className="w-fit self-center" />
          </div>
        )}
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingConnectVaultPage.displayName = "OnboardingConnectVaultPage"
