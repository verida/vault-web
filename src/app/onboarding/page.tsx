"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Typography } from "@/components/ui/typography"
import { OnboardingBreadcrumb } from "@/features/onboarding/components/onboarding-breadcrumb"
import {
  OnboardingStepConnectContent,
  onboardingStepBreadcrumbTitle as onboardingStepConnectBreadcrumbTitle,
  onboardingStepId as onboardingStepConnectId,
} from "@/features/onboarding/components/onboarding-step-connect-content"
import {
  OnboardingStepProfileContent,
  onboardingStepBreadcrumbTitle as onboardingStepProfileBreadcrumbTitle,
  onboardingStepId as onboardingStepProfileId,
} from "@/features/onboarding/components/onboarding-step-profile-content"
import {
  OnboardingStepSetupConnectionsContent,
  onboardingStepBreadcrumbTitle as onboardingStepSetupConnectionsBreadcrumbTitle,
  onboardingStepId as onboardingStepSetupConnectionsId,
} from "@/features/onboarding/components/onboarding-step-setup-connections-content"
import {
  OnboardingStepWelcomeContent,
  onboardingStepBreadcrumbTitle as onboardingStepWelcomeBreadcrumbTitle,
  onboardingStepId as onboardingStepWelcomeId,
} from "@/features/onboarding/components/onboarding-step-welcome-content"
import { useOnboardingEntryQueryState } from "@/features/onboarding/hooks/use-onboarding-entry-query-state"
import type { OnboardingStep } from "@/features/onboarding/types"
import { getRootPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry/logger"
import type { VeridaProfileFormData } from "@/features/verida-profile/types"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("onboarding")

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: onboardingStepWelcomeId,
    breadcrumbTitle: onboardingStepWelcomeBreadcrumbTitle,
  },
  {
    id: onboardingStepProfileId,
    breadcrumbTitle: onboardingStepProfileBreadcrumbTitle,
  },
  {
    id: onboardingStepConnectId,
    breadcrumbTitle: onboardingStepConnectBreadcrumbTitle,
  },
  {
    id: onboardingStepSetupConnectionsId,
    breadcrumbTitle: onboardingStepSetupConnectionsBreadcrumbTitle,
  },
]

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { account } = useVerida()

  useEffect(() => {
    if (!account) {
      logger.info("No Verida account. Redirecting to home page.")
      router.push(getRootPageRoute())
    }
  }, [account, router])

  const { onboardingEntryPath, serializeOnboardingEntryPath } =
    useOnboardingEntryQueryState()

  // TODO: Try to use the profile details to pre-fill the Verida profile form
  // const { data: profiles } = useProfiles({
  //   client: thirdwebClient,
  // })

  // const initialName = useMemo(() => {
  //   const profile = profiles?.at(0)
  //   // @ts-expect-error - The name is not typed because it's specific to some profile types
  //   return profile?.details.name || ""
  // }, [profiles])

  const [profileFormData, setProfileFormData] = useState<VeridaProfileFormData>(
    {
      name: "",
      description: "",
      avatar: { uri: "" },
      website: "",
      country: "",
    }
  )

  const [currentStepIndex, setCurrentStepIndex] = useState(0)

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
      setCurrentStepIndex((current) => current + 1)
    }
  }, [currentStepIndex])

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }, [currentStepIndex])

  const currentStep = useMemo(
    () => ONBOARDING_STEPS[currentStepIndex],
    [currentStepIndex]
  )

  const renderStepContent = useCallback(() => {
    switch (currentStep.id) {
      case onboardingStepWelcomeId:
        return (
          <OnboardingStepWelcomeContent
            onPreviousStepClick={goToEntryPoint}
            previousStepButtonLabel="Back"
            onNextStepClick={goToNextStep}
            nextStepButtonLabel="Next"
          />
        )
      case onboardingStepProfileId:
        return (
          <OnboardingStepProfileContent
            onPreviousStepClick={goToPreviousStep}
            previousStepButtonLabel="Back"
            onNextStepClick={goToNextStep}
            nextStepButtonLabel="Next"
            onProfileFormSubmit={setProfileFormData}
            initialData={profileFormData}
          />
        )
      case onboardingStepConnectId:
        return (
          <OnboardingStepConnectContent
            onPreviousStepClick={goToPreviousStep}
            previousStepButtonLabel="Back"
            onNextStepClick={goToNextStep}
            nextStepButtonLabel="Next"
            profileFormData={profileFormData}
          />
        )
      case onboardingStepSetupConnectionsId:
        return (
          <OnboardingStepSetupConnectionsContent
            onPreviousStepClick={goToPreviousStep}
            previousStepButtonLabel="Back"
            onNextStepClick={goToEntryPoint}
            nextStepButtonLabel="Finish"
          />
        )
      default:
        return <Typography>Step not found</Typography>
    }
  }, [
    currentStep.id,
    goToEntryPoint,
    goToNextStep,
    goToPreviousStep,
    profileFormData,
  ])

  return (
    <>
      <OnboardingBreadcrumb
        steps={ONBOARDING_STEPS}
        currentStepIndex={currentStepIndex}
      />
      {renderStepContent()}
    </>
  )
}
OnboardingPage.displayName = "OnboardingPage"
