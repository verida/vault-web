import { ReactNode } from "react"

import { OnboardingBreadcrumb } from "@/features/onboarding/components/onboarding-breadcrumb"
import { OnboardingProvider } from "@/features/onboarding/components/onboarding-provider"
import { OnboardingStepNav } from "@/features/onboarding/components/onboarding-step-nav"

export interface OnboardingLayoutProps {
  children: ReactNode
}

export default function OnboardingLayout(props: OnboardingLayoutProps) {
  const { children } = props

  return (
    <div className="flex flex-1 flex-col items-center pb-4 md:pb-6 xl:pb-8">
      <div className="flex w-full max-w-screen-lg flex-col gap-4">
        <OnboardingProvider>
          <OnboardingBreadcrumb />
          {children}
          <OnboardingStepNav />
        </OnboardingProvider>
      </div>
    </div>
  )
}
OnboardingLayout.displayName = "OnboardingLayout"
