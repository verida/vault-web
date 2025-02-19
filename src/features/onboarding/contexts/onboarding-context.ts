import { createContext } from "react"

export type OnboardingContextType = {
  currentStepIndex: number
  goToStep: (stepIndex: number) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
)
