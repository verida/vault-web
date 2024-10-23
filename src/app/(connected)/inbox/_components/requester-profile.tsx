import { format } from "date-fns"
import Image from "next/image"
import React from "react"

import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type RequesterProfileProps = {
  sentBy: Record<string, any>
  sentAt: string | Date
}

export function RequesterProfile(props: RequesterProfileProps) {
  const { sentBy, sentAt } = props

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Avatar className="shadow">
          {sentBy?.avatar?.uri && (
            <AvatarImage src={sentBy?.avatar?.uri} asChild>
              <Image src={sentBy?.avatar?.uri} width={48} height={48} alt="" />
            </AvatarImage>
          )}
          <AvatarFallback>{"U"}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Typography variant="heading-5">{sentBy?.name}</Typography>
        <Typography variant="base-s-semibold" className="text-muted-foreground">
          {format(new Date(sentAt), "dd/MM/yyy hh:mm")}
        </Typography>
      </div>
    </div>
  )
}
