import { OnboardingStep } from "@/features/onboarding/types"

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    path: "/install-wallet",
    title: "Install the Verida Wallet",
    description:
      "Get started by installing the Verida Wallet on your mobile device.",
    optional: false,
    nextStep: "/create-identity",
  },
  {
    path: "/create-identity",
    title: "Create your Identity",
    description: "Set up your Verida Identity in the mobile app.",
    optional: false,
    nextStep: "/connect-vault",
    previousStep: "/install-wallet",
  },
  {
    path: "/connect-vault",
    title: "Connect to Verida Vault",
    description: "Link your Verida Identity to this application.",
    optional: false,
    nextStep: "/extract-data",
    previousStep: "/create-identity",
  },
  {
    path: "/extract-data",
    title: "Extract Your Personal Data",
    description: "Optionally import your personal data into the Verida Vault.",
    optional: true,
    previousStep: "/connect-vault",
  },
]
