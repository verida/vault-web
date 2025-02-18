"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { onboardingSteps } from "@/features/onboarding/config/onboarding-steps"
import { useOnboarding } from "@/features/onboarding/hooks/use-onboarding"
import {
  getOnboardingPageRoute,
  getOnboardingStepPageRoute,
} from "@/features/routes/utils"

export interface OnboardingBreadcrumbProps
  extends ComponentProps<typeof Breadcrumb> {}

export function OnboardingBreadcrumb(props: OnboardingBreadcrumbProps) {
  const { className, ...BreadcrumbProps } = props

  const pathname = usePathname()
  const { currentStepIndex } = useOnboarding()

  // Don't show breadcrumb on the main onboarding page
  if (pathname === getOnboardingPageRoute()) {
    return null
  }

  return (
    <Breadcrumb className={className} {...BreadcrumbProps}>
      <BreadcrumbList>
        {onboardingSteps.map((step, index) => (
          <BreadcrumbItem key={step.id}>
            {index === currentStepIndex ? (
              <BreadcrumbPage>{step.title}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={getOnboardingStepPageRoute({ stepId: step.id })}>
                  {step.title}
                </Link>
              </BreadcrumbLink>
            )}
            {index < onboardingSteps.length - 1 ? (
              <BreadcrumbSeparator />
            ) : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
OnboardingBreadcrumb.displayName = "OnboardingBreadcrumb"
