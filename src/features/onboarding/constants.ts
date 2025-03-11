import type { OnboardingStep } from "@/features/onboarding/types"
import {
  getOnboardingConnectVaultPageRoute,
  getOnboardingCreateIdentityPageRoute,
  getOnboardingExtractDataPageRoute,
  getOnboardingInstallWalletPageRoute,
  getOnboardingPageRoute,
} from "@/features/routes/utils"

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    path: getOnboardingPageRoute(),
    breadcrumbTitle: "Getting Started",
  },
  {
    path: getOnboardingInstallWalletPageRoute(),
    breadcrumbTitle: "Install Wallet",
  },
  {
    path: getOnboardingCreateIdentityPageRoute(),
    breadcrumbTitle: "Create Identity",
  },
  {
    path: getOnboardingConnectVaultPageRoute(),
    breadcrumbTitle: "Connect Vault",
  },
  {
    path: getOnboardingExtractDataPageRoute(),
    breadcrumbTitle: "Extract Data",
  },
]
