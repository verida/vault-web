"use client"

import Link from "next/link"
import { type ComponentProps, useMemo } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ValidVeridaAuthRequest } from "@/features/verida-auth/types"
import { getVeridaExplorerIdentityPageUrl } from "@/features/verida-explorer/utils"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"

export interface VeridaAuthCardHeaderProps
  extends ComponentProps<typeof CardHeader> {
  request: ValidVeridaAuthRequest
}

export function VeridaAuthCardHeader(props: VeridaAuthCardHeaderProps) {
  const { request, className, ...cardHeaderProps } = props

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
    <CardHeader className={className} {...cardHeaderProps}>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-1"
          className="flex flex-col gap-3 border-b-0"
        >
          <div className="flex flex-row items-center gap-2">
            <ProfileAvatar
              profile={profile}
              isLoading={isLoading}
              className="size-12"
            />
            <div className="flex flex-col gap-0">
              <CardTitle>
                <span
                  className={
                    profile?.name ? "" : "italic text-muted-foreground"
                  }
                >
                  {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
                </span>{" "}
                wants to access your Verida Vault
              </CardTitle>
              <AccordionTrigger className="w-fit py-0 text-muted-foreground">
                <CardDescription>App details</CardDescription>
              </AccordionTrigger>
            </div>
          </div>
          <AccordionContent className="flex flex-col gap-1 pb-0">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardHeader>
  )
}
VeridaAuthCardHeader.displayName = "VeridaAuthCardHeader"
