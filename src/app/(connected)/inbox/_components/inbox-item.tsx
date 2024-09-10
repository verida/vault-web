import Image from "next/image"
import Link from "next/link"

import { InboxStatusText } from "@/app/(connected)/inbox/_components/inbox-status-text"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { inboxTypes } from "@/features/inbox/constants"
import { InboxEntry } from "@/features/inbox/types"
import { cn } from "@/styles/utils"
import { formatDate } from "@/utils/misc"

export type InboxRowItemProps = {
  message: InboxEntry
  href?: string
}

export function InboxRowItem(props: InboxRowItemProps) {
  const { message, href } = props
  const { message: title, read, sentAt, sentBy, type, data } = message
  const InboxTypeIcon = inboxTypes[type].icon

  return (
    <Link href={href || "#"} className="w-full rounded-lg">
      <Card className="hover:bg-surface-hover flex w-full cursor-pointer rounded-lg hover:border-border-hover">
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
                {sentBy.avatar?.uri && (
                  <AvatarImage src={sentBy.avatar?.uri} asChild>
                    <Image
                      src={sentBy.avatar?.uri}
                      width={48}
                      height={48}
                      alt=""
                    />
                  </AvatarImage>
                )}
                <AvatarFallback>{"U"}</AvatarFallback>
              </Avatar>
            </div>
            <Typography variant="base-semibold">{sentBy.name}</Typography>
          </div>
          <div className="flex shrink items-center gap-4 px-4">
            <div className="flex items-center gap-2">
              <InboxTypeIcon />
              <Typography variant="base-semibold">
                {inboxTypes[type].text}
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
              {sentBy.avatar?.uri && (
                <AvatarImage src={sentBy.avatar?.uri} asChild>
                  <Image
                    src={sentBy.avatar?.uri}
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
              <Typography variant="heading-5">{sentBy.name}</Typography>
              <Typography variant="base-s-regular">
                {formatDate(sentAt)}
              </Typography>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <InboxTypeIcon className="h-4 w-4" />
                <Typography variant="base-s-semibold">
                  {inboxTypes[type].text}
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
