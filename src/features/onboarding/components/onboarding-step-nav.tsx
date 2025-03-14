"use client"

import { type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { ONBOARDING_STEPS } from "@/features/onboarding/constants"
import { useOnboarding } from "@/features/onboarding/hooks/use-onboarding"
import { cn } from "@/styles/utils"

export interface OnboardingStepNavProps
  extends Omit<ComponentProps<"footer">, "children"> {}

export function OnboardingStepNav(props: OnboardingStepNavProps) {
  const { className, ...divProps } = props

  const { currentStepIndex, goToNextStep, goToPreviousStep } = useOnboarding()

  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1

  return (
    <footer
      className={cn("flex flex-row-reverse justify-between gap-4", className)}
      {...divProps}
    >
      <Button onClick={goToNextStep}>{isLastStep ? "Finish" : "Next"}</Button>
      <Button variant="outline" onClick={goToPreviousStep}>
        Back
      </Button>
    </footer>
  )
}
OnboardingStepNav.displayName = "OnboardingStepNav"
