import moment from "moment"
import Image from "next/image"
import React from "react"

import { Typography } from "../typography"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface RequesterProfileProps {
  sentBy: Record<string, any>
  sentAt: string | Date
}

export const RequesterProfile: React.FC<RequesterProfileProps> = (props) => {
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
        <Typography
          variant="base-s-semibold"
          className="text-secondary-foreground"
        >
          {moment(new Date(sentAt)).format("DD/MM/YY hh:mm")}
        </Typography>
      </div>
    </div>
  )
}
