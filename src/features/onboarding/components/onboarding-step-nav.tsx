"use client"

import { usePathname, useRouter } from "next/navigation"
import { ComponentProps, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { onboardingSteps } from "@/features/onboarding/config/onboarding-steps"
import { useOnboarding } from "@/features/onboarding/hooks/use-onboarding"
import {
  getOnboardingPageRoute,
  getOnboardingStepPageRoute,
  getRootPageRoute,
} from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export interface OnboardingStepNavProps
  extends Omit<ComponentProps<"footer">, "children"> {}

export function OnboardingStepNav(props: OnboardingStepNavProps) {
  const { className, ...divProps } = props

  const { currentStepIndex, setCurrentStepIndex } = useOnboarding()
  const router = useRouter()
  const pathname = usePathname()

  const handleNext = useCallback(() => {
    if (currentStepIndex < onboardingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      router.push(
        getOnboardingStepPageRoute({
          stepId: onboardingSteps[currentStepIndex + 1].id,
        })
      )
    } else {
      // TODO: Handle redirect to entry point (home, auth, request)
      router.push(getRootPageRoute())
    }
  }, [currentStepIndex, router, setCurrentStepIndex])

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      router.push(
        getOnboardingStepPageRoute({
          stepId: onboardingSteps[currentStepIndex - 1].id,
        })
      )
    } else {
      // TODO: Handle redirect to entry point (home, auth, request)
      router.push(getRootPageRoute())
    }
  }

  const isLastStep = currentStepIndex === onboardingSteps.length - 1

  if (pathname === getOnboardingPageRoute()) {
    return null
  }

  return (
    <footer
      className={cn("flex flex-row-reverse justify-between gap-4", className)}
      {...divProps}
    >
      <Button onClick={handleNext}>{isLastStep ? "Finish" : "Next"}</Button>
      <Button variant="outline" onClick={handleBack}>
        Back
      </Button>
    </footer>
  )
}
OnboardingStepNav.displayName = "OnboardingStepNav"
