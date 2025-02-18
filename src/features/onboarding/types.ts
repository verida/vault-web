export type OnboardingStep = {
  path: string
  title: string
  description: string
  optional: boolean
  nextStep?: string
  previousStep?: string
}
