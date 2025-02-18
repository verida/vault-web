import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardFooter,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"

export default function OnboardingPage() {
  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Welcome to the Verida Vault"
        description="Let's get you set up with Verida in just a few steps."
      />
      <OnboardingCardBody>
        <p className="mb-4">This onboarding process will guide you through:</p>
        <ul className="mb-6 list-inside list-disc">
          <li>Installing the Verida Wallet</li>
          <li>Creating your Verida Identity</li>
          <li>Connecting to the Verida Vault</li>
          <li>Optionally extracting your personal data</li>
        </ul>
      </OnboardingCardBody>
      <OnboardingCardFooter
        nextStepPath="/onboarding/install-wallet"
        nextStepLabel="Start"
      />
    </OnboardingCard>
  )
}
OnboardingPage.displayName = "OnboardingPage"
