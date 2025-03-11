"use client"

import Link from "next/link"
import { type ComponentProps, useMemo } from "react"

import { Card, CardBody, CardHeader } from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { getVeridaExplorerIdentityPageUrl } from "@/features/verida-explorer/utils"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import type { VeridaProfile } from "@/features/verida-profile/types"
import { cn } from "@/styles/utils"

export interface ProfileCardProps {
  profile: VeridaProfile
  did: string
}

export function ProfileCard(props: ProfileCardProps) {
  const { profile, did } = props

  // Format website URL to properly display punycode domains
  const formattedWebsite = useMemo(() => {
    if (!profile.website) {
      return null
    }

    try {
      return new URL(profile.website)
    } catch (error) {
      return null
    }
  }, [profile.website])

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-start gap-4">
        <ProfileAvatar profile={profile} className="size-14" />
        <div className="flex flex-col gap-0">
          <Typography variant="heading-3" component="p">
            {profile.name || EMPTY_PROFILE_NAME_FALLBACK}
          </Typography>
          <div className="text-muted-foreground">
            <Link
              href={getVeridaExplorerIdentityPageUrl(did)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              <Typography variant="base-regular" className="break-all">
                {did}
              </Typography>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <ProfileItemField label="Description" value={profile.description} />
        <ProfileItemField label="Country" value={profile.country} />
        <ProfileItemUrlField label="Website" url={formattedWebsite} />
        <ProfileItemField label="Username" value={profile.username} />
      </CardBody>
    </Card>
  )
}
ProfileCard.displayName = "ProfileCard"

interface ProfileItemFieldProps
  extends Omit<ComponentProps<"div">, "children"> {
  label: string
  value: string | null | undefined
}

function ProfileItemField(props: ProfileItemFieldProps) {
  const { label, value, className, ...divProps } = props

  return (
    <div className={cn("flex flex-col gap-1", className)} {...divProps}>
      <div className="text-muted-foreground">
        <Typography variant="base-semibold">{label}</Typography>
      </div>
      <Typography variant="base-regular" className="break-words">
        {value || EMPTY_VALUE_FALLBACK}
      </Typography>
    </div>
  )
}
ProfileItemField.displayName = "ProfileItemField"

interface ProfileItemUrlFieldProps
  extends Omit<ComponentProps<"div">, "children"> {
  label: string
  url: URL | null | undefined
}

function ProfileItemUrlField(props: ProfileItemUrlFieldProps) {
  const { label, url, className, ...divProps } = props

  return (
    <div className={cn("flex flex-col gap-1", className)} {...divProps}>
      <div className="text-muted-foreground">
        <Typography variant="base-semibold">{label}</Typography>
      </div>
      <Typography variant="base-regular" className="break-words">
        {url ? (
          <Link
            href={url.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {`${url.origin}${url.pathname}${url.search}${url.hash}`}
          </Link>
        ) : (
          EMPTY_VALUE_FALLBACK
        )}
      </Typography>
    </div>
  )
}
ProfileItemField.displayName = "ProfileItemField"
