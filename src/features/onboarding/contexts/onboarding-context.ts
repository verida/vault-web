import { createContext } from "react"

export type OnboardingContextType = {
  currentStepIndex: number
  setCurrentStepIndex: (index: number) => void
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
)
