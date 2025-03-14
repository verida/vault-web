import { Typography } from "@/components/ui/typography"
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
        description="Set up your Verida Identity in the Verida Wallet mobile app"
      />
      <OnboardingCardBody className="flex flex-col gap-8">
        <Typography>
          {`Your Verida identity (or Verida account) is main account you
            will use to interact with the Verida Network. Your personal data will be stored under this identity's control.`}
        </Typography>
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
          <li>
            <Typography component="span">
              Once your identity is created, go to the next step of this
              onboarding process
            </Typography>
          </li>
        </ol>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingCreateIdentityPage.displayName = "OnboardingCreateIdentityPage"
