import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Onboarding",
}

export interface OnboardingLayoutProps {
  children: ReactNode
}

export default function OnboardingLayout(props: OnboardingLayoutProps) {
  const { children } = props

  return (
    <div className="flex flex-1 flex-col items-center pb-4 md:pb-6 xl:pb-8">
      <div className="flex w-full max-w-screen-lg flex-col gap-4">
        {children}
      </div>
    </div>
  )
}
OnboardingLayout.displayName = "OnboardingLayout"
