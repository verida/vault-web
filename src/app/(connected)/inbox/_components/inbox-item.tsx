"use client"

import Image from "next/image"
import Link from "next/link"

import { InboxStatusText } from "@/app/(connected)/inbox/_components/inbox-status-text"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { INBOX_TYPE_DEFS } from "@/features/inbox/constants"
import { InboxEntry } from "@/features/inbox/types"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { cn } from "@/styles/utils"
import { formatDate } from "@/utils/misc"

export type InboxRowItemProps = {
  message: InboxEntry
  href?: string
}

export function InboxRowItem(props: InboxRowItemProps) {
  const { message, href } = props

  const { message: title, read, sentAt, type, data } = message
  const { did, context } = message.sentBy

  const { profile: senderProfile } = useVeridaProfile({
    did,
    contextName: context,
  })

  const InboxTypeIcon = INBOX_TYPE_DEFS[type].icon

  return (
    <Link href={href || "#"} className="w-full rounded-lg">
      <Card className="flex w-full cursor-pointer rounded-lg hover:border-border-hover hover:bg-surface-hover">
        {/* desktop card */}
        <div className="hidden min-h-[72px] w-full grid-cols-[1fr_1fr_1fr_160px] text-sm md:grid">
          <div className="flex shrink items-center gap-3 px-4">
            <span
              className={cn(
                "size-2 rounded-full bg-accent",
                read ? "opacity-0" : "opacity-100"
              )}
            >
              <span className="sr-only">
                {read ? "Read message" : "Unread message"}
              </span>
            </span>
            <div className="relative">
              <Avatar>
                {senderProfile?.avatar?.uri && (
                  <AvatarImage src={senderProfile.avatar.uri} asChild>
                    <Image
                      src={senderProfile.avatar.uri}
                      width={48}
                      height={48}
                      alt=""
                    />
                  </AvatarImage>
                )}
                <AvatarFallback>{"U"}</AvatarFallback>
              </Avatar>
            </div>
            <Typography variant="base-semibold">
              {senderProfile?.name || EMPTY_PROFILE_NAME_FALLBACK}
            </Typography>
          </div>
          <div className="flex shrink items-center gap-4 px-4">
            <div className="flex items-center gap-2">
              <InboxTypeIcon />
              <Typography variant="base-semibold">
                {INBOX_TYPE_DEFS[type].text}
              </Typography>
            </div>

            <InboxStatusText status={data.status} inboxType={type} />
          </div>
          <div className="flex items-center px-4">
            <Typography variant="base-semibold" className="px-4">
              {title}
            </Typography>
          </div>
          <div className="flex items-center px-4">
            <Typography
              variant="base-regular"
              className="px-4 text-muted-foreground"
            >
              {formatDate(sentAt)}
            </Typography>
          </div>
        </div>

        {/* mobile card */}
        <div className="flex w-full items-start space-x-3 p-4 md:hidden">
          <div className="relative">
            <Avatar>
              {senderProfile?.avatar?.uri && (
                <AvatarImage src={senderProfile.avatar.uri} asChild>
                  <Image
                    src={senderProfile.avatar.uri}
                    width={48}
                    height={48}
                    alt=""
                  />
                </AvatarImage>
              )}
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow space-y-[6px]">
            <div className="flex items-center justify-between">
              <Typography variant="heading-5">
                {senderProfile?.name || EMPTY_PROFILE_NAME_FALLBACK}
              </Typography>
              <Typography variant="base-s-regular">
                {formatDate(sentAt)}
              </Typography>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <InboxTypeIcon className="h-4 w-4" />
                <Typography variant="base-s-semibold">
                  {INBOX_TYPE_DEFS[type].text}
                </Typography>
              </div>
              <span
                className={cn(
                  "size-2 rounded-full bg-accent",
                  read ? "opacity-0" : "opacity-100"
                )}
              >
                <span className="sr-only">
                  {read ? "Read message" : "Unread message"}
                </span>
              </span>
            </div>
            <Typography variant="base-s-semibold" className="line-clamp-1">
              {title}
            </Typography>
          </div>
        </div>
      </Card>
    </Link>
  )
}
