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
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
      <main className="flex flex-grow flex-col items-center justify-center p-4">
        <OnboardingProvider>
          <div className="flex w-full max-w-2xl flex-col gap-4">
            <OnboardingBreadcrumb />
            {children}
            <OnboardingStepNav />
          </div>
        </OnboardingProvider>
      </main>
    </div>
  )
}
OnboardingLayout.displayName = "OnboardingLayout"
