import { Checkbox } from "@/components/ui/checkbox"
import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"

export default function OnboardingExtractDataPage() {
  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Extract Your Personal Data"
        description="Optionally import your personal data into the Verida Vault."
      />
      <OnboardingCardBody>
        <p className="mb-4">Select the data sources you want to import from:</p>
        <div className="mb-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="source1" />
            <label htmlFor="source1">Social Media Profiles</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="source2" />
            <label htmlFor="source2">Email Contacts</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="source3" />
            <label htmlFor="source3">Calendar Events</label>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Note: This step is optional. You can skip it if you prefer not to
          import data at this time.
        </p>
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingExtractDataPage.displayName = "OnboardingExtractDataPage"
