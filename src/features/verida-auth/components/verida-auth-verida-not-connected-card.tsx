"use client"

import Link from "next/link"
import { useMemo } from "react"

import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { ValidVeridaAuthRequest } from "@/features/verida-auth/types"
import { getVeridaExplorerIdentityPageUrl } from "@/features/verida-explorer/utils"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { cn } from "@/styles/utils"

export interface VeridaAuthVeridaNotConnectedCardProps
  extends React.ComponentProps<typeof Card> {
  request: ValidVeridaAuthRequest
}

export function VeridaAuthVeridaNotConnectedCard(
  props: VeridaAuthVeridaNotConnectedCardProps
) {
  const { request, className, ...cardProps } = props

  const { appDID, redirectUrl } = request.payload

  const resolvedRedirectUrl = useMemo(() => {
    return new URL(redirectUrl)
  }, [redirectUrl])

  const { profile, isLoading } = useVeridaProfile({
    did: appDID,
  })

  const profileWebsiteUrl = useMemo(() => {
    if (profile?.website) {
      return new URL(profile.website)
    }

    return null
  }, [profile])

  return (
    <Card className={cn("", className)} {...cardProps}>
      <CardHeader className="shrink-0 gap-3">
        <div className="flex flex-row items-center gap-2">
          <ProfileAvatar
            profile={profile}
            isLoading={isLoading}
            className="size-12"
          />
          <CardTitle>
            <span
              className={profile?.name ? "" : "italic text-muted-foreground"}
            >
              {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
            </span>{" "}
            wants to access your Verida Vault
          </CardTitle>
        </div>
        <div className="flex flex-col gap-1">
          <CardDescription className="truncate">
            <Link
              href={getVeridaExplorerIdentityPageUrl(appDID)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {appDID}
            </Link>
          </CardDescription>
          <CardDescription className="truncate">
            <Link
              href={
                profileWebsiteUrl
                  ? profileWebsiteUrl.origin
                  : resolvedRedirectUrl.origin
              }
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {profileWebsiteUrl
                ? profileWebsiteUrl.origin
                : resolvedRedirectUrl.origin}
            </Link>
          </CardDescription>
        </div>
      </CardHeader>
      <CardBody className="flex flex-1 flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <ErrorBlock>
            <ErrorBlockTitle variant="heading-4" component="p">
              You are not connected
            </ErrorBlockTitle>
            <ErrorBlockDescription>
              Learn more about how the Verida Network helps you take back
              control of your personal data.
            </ErrorBlockDescription>
            <ErrorBlockDescription>
              Check{" "}
              <Link
                href="https://www.verida.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                verida.network
              </Link>
            </ErrorBlockDescription>
            <VeridaConnectButton label="Connect with Verida" />
          </ErrorBlock>
        </div>
      </CardBody>
    </Card>
  )
}
VeridaAuthVeridaNotConnectedCard.displayName =
  "VeridaAuthVeridaNotConnectedCard"
