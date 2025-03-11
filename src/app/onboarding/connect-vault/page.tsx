"use client"

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
import { Typography } from "@/components/ui/typography"
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
      <OnboardingCardBody className="flex flex-col gap-8">
        <Typography>
          As you created your Verida identity in the Verida Wallet mobile app,
          you can now connect to the Verida Vault web application with it.
        </Typography>
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
          <>
            <ol className="flex list-inside list-decimal flex-col gap-1">
              <li>
                <Typography component="span">
                  {`Click on the "Connect with Verida" button below`}
                </Typography>
              </li>
              <li>
                <Typography component="span">
                  {`On your mobile device, scan the QR code or click the "Connect" button to open the Verida Wallet.`}
                </Typography>
              </li>
              <li>
                <Typography component="span">
                  Approve the connection request in your Verida Wallet
                </Typography>
              </li>
            </ol>
            <VeridaConnectButton className="w-fit self-center" />
          </>
        )}
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingConnectVaultPage.displayName = "OnboardingConnectVaultPage"
