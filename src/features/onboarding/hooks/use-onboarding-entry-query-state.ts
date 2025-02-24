import { createSerializer, parseAsString, useQueryState } from "nuqs"

export function useOnboardingEntryQueryState() {
  const [onboardingEntryPath, setOnboardingEntryPath] = useQueryState(
    "onboardingEntryPath",
    parseAsString
  )

  const searchParams = {
    onboardingEntryPath: parseAsString,
  }

  const serializeOnboardingEntryPath = createSerializer(searchParams)

  return {
    onboardingEntryPath,
    setOnboardingEntryPath,
    serializeOnboardingEntryPath,
  }
}
