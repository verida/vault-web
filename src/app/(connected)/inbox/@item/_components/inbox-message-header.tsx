"use client"

import { intlFormat, isDate } from "date-fns"
import { ComponentProps, useCallback, useEffect, useState } from "react"

import { Typography } from "@/components/typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { UserYourselfBadge } from "@/features/verida-profile/components/user-yourself-badge"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"
import {
  SHORT_TIME_FORMAT_OPTIONS,
  formatDateDistanceFromNow,
  formatTimeDistanceFromNow,
} from "@/utils/date"

type InboxMessageHeaderProps = {
  inboxMessage: VeridaInboxMessageRecord
} & Omit<ComponentProps<"div">, "children">

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

  return (
    <div className={cn("", className)} {...divProps}>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-1"
          className="flex flex-col gap-4 border-b-0"
        >
          <div className={cn("flex flex-row items-start gap-2")}>
            <ProfileAvatar
              profile={profile}
              isLoading={isLoading}
              className="size-12"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-row gap-1.5">
                {profile ? (
                  <>
                    <div
                      className={cn(
                        "min-w-0",
                        profile?.name ? "" : "italic text-muted-foreground"
                      )}
                    >
                      <Typography variant="heading-5" className="h-6 truncate">
                        {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
                      </Typography>
                    </div>
                  </>
                ) : (
                  <Skeleton className="my-1 h-4 w-36" />
                )}
                {did === sentBy.did && (
                  <UserYourselfBadge className="self-start" />
                )}
              </div>
              <AccordionTrigger className="w-fit py-0 text-muted-foreground">
                <Typography variant="base-s-regular" className="truncate">
                  {formattedSentAt}
                </Typography>
              </AccordionTrigger>
            </div>
          </div>
          <AccordionContent className="pb-0">
            <Card className="gap-4 px-4 py-3 shadow-none">
              {sentBy.context &&
              sentBy.context !== VERIDA_VAULT_CONTEXT_NAME ? (
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground">
                    <Typography variant="base-semibold">Context</Typography>
                  </div>
                  <Typography variant="base-regular" className="break-words">
                    {`Via ${sentBy.context}`}
                  </Typography>
                </div>
              ) : null}
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-baseline gap-1.5 text-muted-foreground">
                  <Typography variant="base-semibold">DID</Typography>
                  {did === sentBy.did && <UserYourselfBadge className="" />}
                </div>
                <Typography variant="base-regular" className="break-words">
                  {sentBy.did}
                </Typography>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
InboxMessageHeader.displayName = "InboxMessageHeader"
