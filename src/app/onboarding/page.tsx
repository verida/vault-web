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
        description="Let's get you set up with Verida in just a few steps"
      />
      <OnboardingCardBody className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Typography variant="heading-4" component="p">
            What is Verida?
          </Typography>
          <Typography>
            Verida allows you to take back the control of your personal data by
            extracting them from your usual services and storing them in a
            secured way.
          </Typography>
          <Typography>
            The Verida Network guarantees the security of your data by using
            decentralised storage nodes and cryptographic techniques where you
            are the owner.
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="heading-4" component="p">
            What is Verida Vault?
          </Typography>
          <Typography>
            The Verida Vault is the web application to manage your data. You can
            connect your web2 platforms to extract your data as well as see all
            your data.
          </Typography>
          <Typography>
            The Verida Vault also allows you to manage the access to your stored
            data. You can authorize third-party applications such AI agents to
            access your data, and revoke their access at any time.
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="heading-4" component="p">
            Get started
          </Typography>
          <Typography>
            Follow the next few steps to set up your Verida Vault.
          </Typography>
        </div>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingPage.displayName = "OnboardingPage"
