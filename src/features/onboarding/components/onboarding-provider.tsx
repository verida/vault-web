"use client"

import { ReactNode, useMemo, useState } from "react"

import {
  OnboardingContext,
  OnboardingContextType,
} from "@/features/onboarding/contexts/onboarding-context"

export interface OnboardingProviderProps {
  children: ReactNode
}

export function OnboardingProvider(props: OnboardingProviderProps) {
  const { children } = props

  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const contextValue: OnboardingContextType = useMemo(
    () => ({
      currentStepIndex,
      setCurrentStepIndex,
    }),
    [currentStepIndex, setCurrentStepIndex]
  )

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  )
}
OnboardingProvider.displayName = "OnboardingProvider"
