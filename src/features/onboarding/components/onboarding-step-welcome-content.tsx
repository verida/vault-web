import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"

export const onboardingStepId = "welcome"
export const onboardingStepBreadcrumbTitle = "Welcome"

export interface OnboardingStepWelcomeContentProps {
  onPreviousStepClick: () => void
  previousStepButtonLabel?: string
  onNextStepClick: () => void
  nextStepButtonLabel?: string
}

export function OnboardingStepWelcomeContent(
  props: OnboardingStepWelcomeContentProps
) {
  const {
    onPreviousStepClick,
    previousStepButtonLabel = "Back",
    onNextStepClick,
    nextStepButtonLabel = "Next",
  } = props

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to the Verida Vault</CardTitle>
        <CardDescription>
          We will guide in setting up your account, but first a few words about
          Verida.
        </CardDescription>
      </CardHeader>
      <CardBody className="flex flex-col gap-8">
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
      </CardBody>
      <CardFooter className="flex flex-row justify-between gap-4">
        <Button
          variant="outline"
          onClick={onPreviousStepClick}
          className="w-full sm:w-fit"
        >
          {previousStepButtonLabel}
        </Button>
        <Button onClick={onNextStepClick} className="w-full sm:w-fit">
          {nextStepButtonLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
OnboardingStepWelcomeContent.displayName = "OnboardingStepWelcomeContent"
