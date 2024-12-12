"use client"

import { format } from "date-fns"
import Image from "next/image"
import React from "react"

import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InboxSentBy } from "@/features/inbox/types"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"

export type RequesterProfileProps = {
  sentBy: InboxSentBy
  sentAt: string | Date
}

/**
 * @deprecated
 */
export function RequesterProfile(props: RequesterProfileProps) {
  const { sentBy, sentAt } = props

  const { profile } = useVeridaProfile({
    did: sentBy.did,
    contextName: sentBy.context,
  })

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Avatar className="shadow">
          {profile?.avatar?.uri && (
            <AvatarImage src={profile.avatar.uri} asChild>
              <Image src={profile.avatar.uri} width={48} height={48} alt="" />
            </AvatarImage>
          )}
          <AvatarFallback>{"U"}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Typography variant="heading-5">
          {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
        </Typography>
        <Typography variant="base-s-semibold" className="text-muted-foreground">
          {format(new Date(sentAt), "dd/MM/yyy hh:mm")}
        </Typography>
      </div>
    </div>
  )
}
