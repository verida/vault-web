import { Typography } from "@/components/typography"
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
        <ol className="flex list-inside list-decimal flex-col gap-1">
          <li>
            <Typography component="span">
              Open the Verida Wallet app on your mobile device
            </Typography>
          </li>
          <li>
            <Typography component="span">{`Tap "Create New Identity"`}</Typography>
          </li>
          <li>
            <Typography component="span">
              Follow the on-screen instructions to set up your identity
            </Typography>
          </li>
        </ol>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingCreateIdentityPage.displayName = "OnboardingCreateIdentityPage"
