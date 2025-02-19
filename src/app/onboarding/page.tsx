import { Typography } from "@/components/typography"
import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"

export default function OnboardingPage() {
  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Welcome to the Verida Vault"
        description="Let's get you set up with Verida in just a few steps."
      />
      <OnboardingCardBody className="flex flex-col gap-2">
        <Typography>This onboarding process will guide you through:</Typography>
        <ul className="flex list-inside list-disc flex-col gap-1">
          <li>
            <Typography component="span">
              Installing the Verida Wallet
            </Typography>
          </li>
          <li>
            <Typography component="span">
              Creating your Verida Identity
            </Typography>
          </li>
          <li>
            <Typography component="span">
              Connecting to the Verida Vault
            </Typography>
          </li>
          <li>
            <Typography component="span">
              Optionally extracting your personal data
            </Typography>
          </li>
        </ul>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingPage.displayName = "OnboardingPage"
