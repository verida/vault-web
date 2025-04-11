"use client"

import { AutoAccount } from "@verida/account-node"
import Link from "next/link"
import { useCallback, useState } from "react"
import { useAdminWallet, useWalletInfo } from "thirdweb/react"

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
import { Typography } from "@/components/ui/typography"
import { commonConfig } from "@/config/common"
import { getCountryCode } from "@/features/countries/utils"
import { Logger } from "@/features/telemetry/logger"
import { THIRDWEB_IN_APP_WALLET_ID } from "@/features/thirdweb/constants"
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

  const wallet = useAdminWallet()
  const { data: walletInfo } = useWalletInfo(wallet?.id)

  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [hasFailedConnecting, setHasFailedConnecting] = useState(false)
  const [hasFailedSavingProfile, setHasFailedSavingProfile] = useState(false)

  const handleConnect = useCallback(async () => {
    if (!account) {
      // Should not happen as the parent component ensures that the account is defined
      return
    }

    logger.info("Initiating connection of a new Verida account")

    setHasFailedConnecting(false)
    setHasFailedSavingProfile(false)

    let _failedConnecting = false

    try {
      if (account instanceof AutoAccount) {
        const countryCode = profileFormData.country
          ? getCountryCode(profileFormData.country)
          : undefined

        logger.debug("Loading default storage nodes")

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
      setHasFailedConnecting(true)
    }

    if (_failedConnecting) {
      return
    }

    try {
      logger.debug("Saving profile in new Verida account")

      setIsSavingProfile(true)

      // Wait for the storage nodes to be synchronised
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
          {
            "Your Verida identity hasn't been finalised yet. Let's get you connected to the Verida Network to finalise it"
          }
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
              className="w-fit"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect with Verida"}
            </Button>
          </ErrorBlock>
        ) : isConnecting ? (
          <div className="flex flex-col gap-4">
            <Typography>
              {`You are connecting with ${walletInfo?.name}`}
            </Typography>
            {wallet?.id !== THIRDWEB_IN_APP_WALLET_ID ? (
              <Typography>
                {`A few signatures will be required in ${walletInfo?.name} to finalise your Verida identity`}
              </Typography>
            ) : null}
            <LoadingBlock>
              <LoadingBlockSpinner />
              <LoadingBlockTitle>Connecting to Verida...</LoadingBlockTitle>
              <LoadingBlockDescription>
                Please wait while we establish a secure connection. This might
                take a moment.
              </LoadingBlockDescription>
            </LoadingBlock>
          </div>
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
          <div className="flex flex-col gap-4">
            <Typography>
              {`You are connecting with ${walletInfo?.name}`}
            </Typography>
            {wallet?.id !== THIRDWEB_IN_APP_WALLET_ID ? (
              <Typography>
                {`A few signatures will be required in ${walletInfo?.name} to finalise your Verida identity`}
              </Typography>
            ) : null}
            <div className="flex h-52 flex-row items-center justify-center">
              <Button
                variant="primary"
                className="w-fit"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect with Verida"}
              </Button>
            </div>
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
