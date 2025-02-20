"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ReactNode, useCallback, useMemo } from "react"

import { ONBOARDING_STEPS } from "@/features/onboarding/constants"
import {
  OnboardingContext,
  OnboardingContextType,
} from "@/features/onboarding/contexts/onboarding-context"
import { useOnboardingEntryQueryState } from "@/features/onboarding/hooks/use-onboarding-entry-query-state"
import { getRootPageRoute } from "@/features/routes/utils"

export interface OnboardingProviderProps {
  children: ReactNode
}

export function OnboardingProvider(props: OnboardingProviderProps) {
  const { children } = props

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const { onboardingEntryPath, serializeOnboardingEntryPath } =
    useOnboardingEntryQueryState()

  const currentStepIndex = useMemo(() => {
    return ONBOARDING_STEPS.findIndex((step) => step.path === pathname)
  }, [pathname])

  const goToStep = useCallback(
    (stepIndex: number) => {
      const newPath = `${ONBOARDING_STEPS[stepIndex].path}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
      router.push(newPath)
    },
    [router, searchParams]
  )

  const goToEntryPoint = useCallback(() => {
    const entryPath = onboardingEntryPath || getRootPageRoute()
    const newPath = serializeOnboardingEntryPath(
      `${entryPath}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
      {
        onboardingEntryPath: null,
      }
    )

    router.push(newPath)
  }, [onboardingEntryPath, searchParams, serializeOnboardingEntryPath, router])

  const goToNextStep = useCallback(() => {
    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      goToStep(currentStepIndex + 1)
    } else {
      goToEntryPoint()
    }
  }, [currentStepIndex, goToStep, goToEntryPoint])

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1)
    } else {
      goToEntryPoint()
    }
  }, [currentStepIndex, goToStep, goToEntryPoint])

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
