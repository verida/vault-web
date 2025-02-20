"use client"

import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useCallback, useMemo } from "react"

import { useRedirectPathQueryState } from "@/features/auth/hooks/use-redirect-path-query-state"
import { ONBOARDING_STEPS } from "@/features/onboarding/constants"
import {
  OnboardingContext,
  OnboardingContextType,
} from "@/features/onboarding/contexts/onboarding-context"
import { getRootPageRoute } from "@/features/routes/utils"

export interface OnboardingProviderProps {
  children: ReactNode
}

export function OnboardingProvider(props: OnboardingProviderProps) {
  const { children } = props

  const pathname = usePathname()
  const router = useRouter()

  const { redirectPath, serializeRedirectPath } = useRedirectPathQueryState()

  const currentStepIndex = useMemo(() => {
    return ONBOARDING_STEPS.findIndex((step) => step.path === pathname)
  }, [pathname])

  const goToStep = useCallback(
    (stepIndex: number) => {
      const newPath = serializeRedirectPath(ONBOARDING_STEPS[stepIndex].path, {
        redirectPath,
      })
      router.push(newPath)
    },
    [router, redirectPath, serializeRedirectPath]
  )

  const goToNextStep = useCallback(() => {
    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      goToStep(currentStepIndex + 1)
    } else {
      // TODO: Handle redirect to entry point (home, auth, request)
      const newPath = serializeRedirectPath(getRootPageRoute(), {
        redirectPath,
      })
      router.push(newPath)
    }
  }, [currentStepIndex, goToStep, router, redirectPath, serializeRedirectPath])

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1)
    } else {
      const newPath = serializeRedirectPath(getRootPageRoute(), {
        redirectPath,
      })
      router.push(newPath)
    }
  }, [currentStepIndex, goToStep, router, redirectPath, serializeRedirectPath])

  const contextValue: OnboardingContextType = useMemo(
    () => ({
      currentStepIndex,
      goToStep,
      goToNextStep,
      goToPreviousStep,
    }),
    [currentStepIndex, goToStep, goToNextStep, goToPreviousStep]
  )

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  )
}
OnboardingProvider.displayName = "OnboardingProvider"
