import Image from "next/image"
import { ReactNode } from "react"

import { VeridaIdentityDropdownMenu } from "@/components/verida/verida-identity-dropdown-menu"
import { OnboardingBreadcrumb } from "@/features/onboarding/components/onboarding-breadcrumb"
import { OnboardingProvider } from "@/features/onboarding/components/onboarding-provider"
import { OnboardingStepNav } from "@/features/onboarding/components/onboarding-step-nav"

export interface OnboardingLayoutProps {
  children: ReactNode
}

export default function OnboardingLayout(props: OnboardingLayoutProps) {
  const { children } = props

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="z-10 h-[73px] border-b bg-surface shadow-sm">
        <div className="flex h-full flex-row justify-center">
          <div className="flex w-full max-w-screen-2xl flex-1 flex-row items-stretch justify-between gap-4">
            <div className="flex flex-row items-stretch gap-4 pl-4 md:pl-6 xl:pl-8">
              <div className="flex shrink-0 flex-row items-center">
                <Image
                  src="/logo.svg"
                  alt="Verida Vault Logo"
                  height={32}
                  width={95}
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 py-4 pr-4 md:pr-6 xl:pr-8">
              <VeridaIdentityDropdownMenu
                displayNotConnectedSkeleton={false}
                hideDisconnect={false}
                hideFeedback={false}
                hideAuthorizedApps={true}
              />
            </div>
          </div>
        </div>
      </header>
      <OnboardingProvider>
        <div className="flex flex-1 flex-col items-center overflow-y-auto">
          <main className="flex w-full max-w-screen-lg flex-col gap-4 px-4 py-6 md:px-6 md:py-10 xl:px-8">
            <OnboardingBreadcrumb />
            {children}
            <OnboardingStepNav />
          </main>
        </div>
      </OnboardingProvider>
    </div>
  )
}
OnboardingLayout.displayName = "OnboardingLayout"
