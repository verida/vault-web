import Image from "next/image"
import Link from "next/link"

import { Typography } from "@/components/typography"
import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"
import {
  VERIDA_WALLET_APPLE_APP_STORE_URL,
  VERIDA_WALLET_GOOGLE_PLAY_STORE_URL,
} from "@/features/verida-wallet/constants"

export default function OnboardingInstallWalletPage() {
  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Install the Verida Wallet"
        description="Start by installing the Verida Wallet on your mobile device"
      />
      <OnboardingCardBody className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Typography>
            The Verida Wallet is a mobile application controlling your identity
            on the Verida Network. You own the private key of your identity and
            all the data related to it.
          </Typography>
        </div>
        <ol className="flex list-inside list-decimal flex-col gap-1">
          <li>
            <Typography component="span">
              Click on the link below to install the Verida Wallet from your
              phone app store
            </Typography>
          </li>
          <li>
            <Typography component="span">
              Follow the instructions to install the app.
            </Typography>
          </li>
          <li>
            <Typography component="span">
              Once installed, go to the next step of this onboarding process.
            </Typography>
          </li>
        </ol>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <Link
            href={VERIDA_WALLET_APPLE_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/app-store-badge.svg"
              alt="Download on the App Store"
              width={160}
              height={53}
            />
          </Link>
          <Link
            href={VERIDA_WALLET_GOOGLE_PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/google-play-badge.png"
              alt="Get it on Google Play"
              width={180}
              height={53}
            />
          </Link>
        </div>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingInstallWalletPage.displayName = "OnboardingInstallWalletPage"
