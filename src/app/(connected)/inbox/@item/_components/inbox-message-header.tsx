"use client"

import { intlFormat, isDate } from "date-fns"
import { useCallback, useEffect, useState } from "react"

import { Typography } from "@/components/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { UserYourselfBadge } from "@/features/verida-profile/components/user-yourself-badge"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"
import {
  SHORT_TIME_FORMAT_OPTIONS,
  formatDateDistanceFromNow,
  formatTimeDistanceFromNow,
} from "@/utils/date"

type InboxMessageHeaderProps = {
  inboxMessage: VeridaInboxMessageRecord
} & React.ComponentProps<"div">

export function InboxMessageHeader(props: InboxMessageHeaderProps) {
  const { inboxMessage, className, ...divProps } = props

  const { sentBy, sentAt } = inboxMessage

  const { did } = useVerida()

  const { profile, isLoading } = useVeridaProfile({
    did: sentBy.did,
  })

  const [formattedSentAt, setFormattedSentAt] =
    useState<string>(EMPTY_VALUE_FALLBACK)

  const updateFormattedSentAt = useCallback(() => {
    const date = new Date(sentAt || "")
    if (!isDate(date)) {
      return EMPTY_VALUE_FALLBACK
    }

    const formattedDate = formatDateDistanceFromNow(date)
    const formattedTime = intlFormat(date, SHORT_TIME_FORMAT_OPTIONS)
    let formattedString = `${formattedDate} at ${formattedTime}`

    const timeDiffInMinutes = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60)
    )
    if (timeDiffInMinutes < 60) {
      const timeDistance = formatTimeDistanceFromNow(date, { compact: true })
      formattedString += ` (${timeDistance})`
    }

    setFormattedSentAt(formattedString)
  }, [sentAt])

  useEffect(() => {
    updateFormattedSentAt()
    const intervalId = setInterval(updateFormattedSentAt, 60000) // Update every minute
    return () => clearInterval(intervalId)
  }, [updateFormattedSentAt])

  // TODO: Add the additional information as a collapsible section (DID, via context, etc.)

  return (
    <div
      className={cn("flex flex-row items-start gap-2", className)}
      {...divProps}
    >
      <ProfileAvatar
        profile={profile}
        isLoading={isLoading}
        className="size-12"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div
          className={cn(
            "flex flex-row items-baseline gap-1.5",
            profile?.name ? "" : "italic text-muted-foreground"
          )}
        >
          <Typography variant="heading-5" className="truncate">
            {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
          </Typography>
          {did === sentBy.did && <UserYourselfBadge className="self-start" />}
        </div>
        <div className="text-muted-foreground">
          <Typography variant="base-s-regular" className="truncate">
            {formattedSentAt}
          </Typography>
        </div>
      </div>
    </div>
  )
}
InboxMessageHeader.displayName = "InboxMessageHeader"
