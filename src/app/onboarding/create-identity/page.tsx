import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"

export default function OnboardingCreateIdentityPage() {
  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Create your Identity"
        description="Set up your Verida Identity in the mobile app."
      />
      <OnboardingCardBody>
        <ol className="mb-6 list-inside list-decimal space-y-2">
          <li>Open the Verida Wallet app on your mobile device.</li>
          <li>{`Tap "Create New Identity".`}</li>
          <li>Follow the on-screen instructions to set up your identity.</li>
          <li>Make sure to securely store your recovery phrase.</li>
        </ol>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingCreateIdentityPage.displayName = "OnboardingCreateIdentityPage"
