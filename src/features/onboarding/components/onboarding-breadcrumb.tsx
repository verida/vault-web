"use client"

import { type ComponentProps, Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { OnboardingStep } from "@/features/onboarding/types"
import { cn } from "@/styles/utils"

export interface OnboardingBreadcrumbProps
  extends Omit<ComponentProps<typeof Breadcrumb>, "children"> {
  steps: OnboardingStep[]
  currentStepIndex: number
}

export function OnboardingBreadcrumb(props: OnboardingBreadcrumbProps) {
  const { steps, className, currentStepIndex, ...BreadcrumbProps } = props

  return (
    <Breadcrumb className={className} {...BreadcrumbProps}>
      <BreadcrumbList>
        {steps.map((step, index) => (
          <Fragment key={step.id}>
            <BreadcrumbItem>
              <BreadcrumbPage
                className={cn(
                  index === currentStepIndex
                    ? "text-primary-hover"
                    : index < currentStepIndex
                      ? "text-primary"
                      : "text-muted-foreground"
                )}
              >
                {step.breadcrumbTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
            {index < steps.length - 1 ? <BreadcrumbSeparator /> : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
OnboardingBreadcrumb.displayName = "OnboardingBreadcrumb"
