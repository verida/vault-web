import Image from "next/image"

import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"

export default function OnboardingInstallWalletPage() {
  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Install the Verida Wallet"
        description="Get started by installing the Verida Wallet on your mobile device."
      />
      <OnboardingCardBody>
        <ol className="mb-6 list-inside list-decimal space-y-2">
          <li>{`Choose your device's app store below.`}</li>
          <li>
            {` Search for "Verida Wallet" or click the store badge to go directly
            to the app.`}
          </li>
          <li>{`Tap "Install" to download and install the app.`}</li>
          <li>Once installed, open the Verida Wallet app.</li>
        </ol>
        <div className="mb-6 flex justify-center space-x-4">
          <a
            href="https://apps.apple.com/us/app/verida-wallet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/app-store-badge.svg"
              alt="Download on the App Store"
              width={160}
              height={53}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.verida.wallet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/google-play-badge.png"
              alt="Get it on Google Play"
              width={180}
              height={53}
            />
          </a>
        </div>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingInstallWalletPage.displayName = "OnboardingInstallWalletPage"
