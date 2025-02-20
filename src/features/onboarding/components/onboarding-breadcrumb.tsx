"use client"

import { ComponentProps, Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ONBOARDING_STEPS } from "@/features/onboarding/constants"
import { useOnboarding } from "@/features/onboarding/hooks/use-onboarding"

export interface OnboardingBreadcrumbProps
  extends ComponentProps<typeof Breadcrumb> {}

export function OnboardingBreadcrumb(props: OnboardingBreadcrumbProps) {
  const { className, ...BreadcrumbProps } = props

  const { currentStepIndex, goToStep } = useOnboarding()

  // TODO: Make a responsive breadcrumb nicely adapting to the screen size
  return (
    <Breadcrumb className={className} {...BreadcrumbProps}>
      <BreadcrumbList>
        {ONBOARDING_STEPS.map((step, index) => (
          <Fragment key={step.path}>
            <BreadcrumbItem>
              {index === currentStepIndex ? (
                <BreadcrumbPage className="text-primary">
                  {step.breadcrumbTitle}
                </BreadcrumbPage>
              ) : index < currentStepIndex ? (
                <BreadcrumbLink asChild className="underline">
                  <button onClick={() => goToStep(index)}>
                    {step.breadcrumbTitle}
                  </button>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-muted-foreground">
                  {step.breadcrumbTitle}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < ONBOARDING_STEPS.length - 1 ? (
              <BreadcrumbSeparator />
            ) : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
OnboardingBreadcrumb.displayName = "OnboardingBreadcrumb"
