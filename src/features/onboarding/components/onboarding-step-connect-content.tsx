"use client"

import { AutoAccount } from "@verida/account-node"
import Link from "next/link"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import {
  SuccessBlock,
  SuccessBlockDescription,
  SuccessBlockImage,
  SuccessBlockTitle,
} from "@/components/ui/success"
import { commonConfig } from "@/config/common"
import { getCountryCode } from "@/features/countries/utils"
import { Logger } from "@/features/telemetry/logger"
import { useUpdateVeridaProfile } from "@/features/verida-profile/hooks/use-update-verida-profile"
import type { VeridaProfileFormData } from "@/features/verida-profile/types"
import { VERIDA_DEFAULT_STORAGE_NODE_COUNTRY_CODE } from "@/features/verida/constants"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { wait } from "@/utils/misc"

const logger = Logger.create("onboarding")

export const onboardingStepId = "connect"
export const onboardingStepBreadcrumbTitle = "Connect"

export interface OnboardingStepConnectContentProps {
  onPreviousStepClick: () => void
  previousStepButtonLabel?: string
  onNextStepClick: () => void
  nextStepButtonLabel?: string
  profileFormData: VeridaProfileFormData
}

export function OnboardingStepConnectContent(
  props: OnboardingStepConnectContentProps
) {
  const {
    onPreviousStepClick,
    previousStepButtonLabel = "Back",
    onNextStepClick,
    nextStepButtonLabel = "Next",
    profileFormData,
  } = props

  const { isConnecting, isConnected, account, connectAccount } = useVerida()
  const { updateProfileAsync } = useUpdateVeridaProfile()

  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [hasFailedConnecting, setHasFailedConnecting] = useState(false)
  const [hasFailedSavingProfile, setHasFailedSavingProfile] = useState(false)

  const handleConnect = useCallback(async () => {
    if (!account) {
      // Should not happen as the parent component ensures that the account is defined
      return
    }

    setHasFailedConnecting(false)
    setHasFailedSavingProfile(false)

    let _failedConnecting = false

    try {
      if (account instanceof AutoAccount) {
        const countryCode = profileFormData.country
          ? getCountryCode(profileFormData.country)
          : undefined
        await account.loadDefaultStorageNodes(
          countryCode || VERIDA_DEFAULT_STORAGE_NODE_COUNTRY_CODE,
          3,
          {
            network: commonConfig.VERIDA_NETWORK,
            notificationEndpoints: commonConfig.VERIDA_NOTIFICATION_SERVER_URL
              ? [commonConfig.VERIDA_NOTIFICATION_SERVER_URL]
              : undefined,
          }
        )
      }

      await connectAccount(account)
    } catch (error) {
      logger.error(error)
      _failedConnecting = true
    }

    setHasFailedConnecting(_failedConnecting)

    if (_failedConnecting) {
      return
    }

    try {
      setIsSavingProfile(true)

      await wait()

      await updateProfileAsync({
        profileToSave: profileFormData,
      })

      setIsSavingProfile(false)
    } catch (error) {
      logger.error(error)
      setIsSavingProfile(false)
      setHasFailedSavingProfile(true)
    }
  }, [account, connectAccount, profileFormData, updateProfileAsync])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect to Verida</CardTitle>
        <CardDescription>
          {"Let's get you connected to the Verida Network"}
        </CardDescription>
      </CardHeader>
      <CardBody>
        {hasFailedConnecting || hasFailedSavingProfile ? (
          <ErrorBlock>
            <ErrorBlockImage />
            <ErrorBlockTitle>
              {`Failed to ${hasFailedConnecting ? "connect" : "save profile"}`}
            </ErrorBlockTitle>
            <ErrorBlockDescription>
              Please try again. If the problem persists, please contact our
              support on
              <Link
                href="https://discord.verida.io/"
                target="_blank"
                className="underline"
              >
                Discord
              </Link>
            </ErrorBlockDescription>
            <Button
              variant="primary"
              className="w-fit self-center"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect with Verida"}
            </Button>
          </ErrorBlock>
        ) : isConnecting ? (
          <LoadingBlock>
            <LoadingBlockSpinner />
            <LoadingBlockTitle>Connecting to Verida...</LoadingBlockTitle>
            <LoadingBlockDescription>
              Please wait while we establish a secure connection. This might
              take a moment.
            </LoadingBlockDescription>
          </LoadingBlock>
        ) : isSavingProfile ? (
          <LoadingBlock>
            <LoadingBlockSpinner />
            <LoadingBlockTitle>Saving profile...</LoadingBlockTitle>
            <LoadingBlockDescription>
              Please wait while we save your profile. This might take a moment.
            </LoadingBlockDescription>
          </LoadingBlock>
        ) : isConnected ? (
          <SuccessBlock>
            <SuccessBlockImage />
            <SuccessBlockTitle>Connected!</SuccessBlockTitle>
            <SuccessBlockDescription>
              You are now connected to Verida
            </SuccessBlockDescription>
            <SuccessBlockDescription>
              Go to the next step
            </SuccessBlockDescription>
          </SuccessBlock>
        ) : (
          <div className="flex h-52 flex-row items-center justify-between">
            <Button
              variant="primary"
              className="w-fit self-center"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect with Verida"}
            </Button>
          </div>
        )}
      </CardBody>
      <CardFooter className="flex flex-row justify-between gap-4">
        <Button
          variant="outline"
          onClick={onPreviousStepClick}
          disabled={isConnecting || isSavingProfile}
          className="w-full sm:w-fit"
        >
          {previousStepButtonLabel}
        </Button>
        <Button
          variant={
            isConnected && !isSavingProfile && !hasFailedConnecting
              ? "primary"
              : "outline"
          }
          onClick={onNextStepClick}
          disabled={
            isConnecting ||
            !isConnected ||
            hasFailedConnecting ||
            isSavingProfile
          }
          className="w-full sm:w-fit"
        >
          {nextStepButtonLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
OnboardingStepConnectContent.displayName = "OnboardingStepConnectContent"
