import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"

export default function OnboardingConnectVaultPage() {
  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Connect to Verida Vault"
        description="Link your Verida Identity to this application."
      />
      <OnboardingCardBody>
        <ol className="mb-6 list-inside list-decimal space-y-2">
          <li>{`Open the Verida Wallet app on your mobile device.`}</li>
          <li>{`Tap the "Scan QR Code" button.`}</li>
          <li>{`Scan the QR code displayed below (placeholder).`}</li>
          <li>{`Approve the connection request in your Verida Wallet.`}</li>
        </ol>
        <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center bg-gray-200">
          QR Code Placeholder
        </div>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingConnectVaultPage.displayName = "OnboardingConnectVaultPage"
