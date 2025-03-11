import { Metadata } from "next"
import Link from "next/link"

import { RootConnectionHandler } from "@/components/root-connection-handler"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import {
  APP_TITLE_FOR_LANDING,
  TERMS_AND_CONDITIONS_URL,
  VERIDA_WEBSITE_URL,
} from "@/constants/app"
import { VERIDA_PLATFORMS } from "@/features/landing/verida-platforms"
import { OnboardingButton } from "@/features/onboarding/components/onboarding-button"

export const metadata: Metadata = {
  title: {
    absolute: APP_TITLE_FOR_LANDING,
  },
}

export default function RootPage() {
  const currentDate = new Date()

  return (
    <RootConnectionHandler>
      <div className="flex h-full min-h-fit flex-col gap-8 px-4 py-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <div className="flex flex-col gap-2 text-center">
            <Typography variant="heading-1">
              Take control of your personal data
            </Typography>
            <Typography variant="base-l">
              Securely manage your personal data with the Verida Vault.
            </Typography>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Typography
                variant="heading-5"
                component="p"
                className="text-center"
              >
                New to Verida?
              </Typography>
              <OnboardingButton />
            </div>
            <div className="flex flex-col gap-2">
              <Typography
                variant="heading-5"
                component="p"
                className="text-center"
              >
                Already have a Verida Identity?
              </Typography>
              <VeridaConnectButton
                variant="outline"
                label="Connect with Verida Wallet"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 self-center">
          {VERIDA_PLATFORMS.map((platform) => (
            <Button
              key={platform.url}
              variant="outline"
              size="icon"
              className="size-7 rounded-full"
              asChild
            >
              <Link
                href={platform.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <platform.icon className="size-1/2" />
                <span className="sr-only">{platform.label}</span>
              </Link>
            </Button>
          ))}
        </div>
        <footer className="flex flex-row items-center justify-between gap-4 text-muted-foreground">
          <Link
            href={VERIDA_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:underline md:no-underline"
          >
            <Typography variant="base-s-regular">
              &copy; {currentDate.getFullYear()} Verida Network
            </Typography>
          </Link>
          <Link
            href={TERMS_AND_CONDITIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:underline md:no-underline"
          >
            <Typography variant="base-s-regular">Terms & Conditions</Typography>
          </Link>
        </footer>
      </div>
    </RootConnectionHandler>
  )
}
RootPage.displayName = "RootPage"
