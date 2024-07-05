import Image from "next/image";
import Link from "next/link";

import { inboxTypes } from "@/features/inbox/constants";
import { InboxEntry } from "@/features/inbox/types";
import { cn, formatDate } from "@/lib/utils";

import { Typography } from "../typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { InboxStatusText } from "./inbox-status-text";

interface InboxRowItemProps {
  message: InboxEntry;
  href?: string;
}

export const InboxRowItem: React.FC<InboxRowItemProps> = ({
  message,
  href,
}) => {
  const { _id, message: title, read, sentAt, sentBy, type, data } = message;
  const InboxTypeIcon = inboxTypes[type].icon;

  return (
    <Link href={href || "#"} className="w-full">
      <Card className="flex w-full cursor-pointer rounded-lg">
        {/* desktop card */}
        <div className="hidden min-h-[72px] w-full grid-cols-[1fr_1fr_1fr_160px] text-sm md:grid">
          <div className="flex shrink items-center gap-3 px-4">
            <span
              className={cn(
                "size-2 rounded-full bg-primary-button",
                read ? "opacity-0" : "opacity-100"
              )}
            ></span>
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
              className="px-4 text-secondary-foreground"
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
                  "size-2 rounded-full bg-primary-button",
                  read ? "opacity-0" : "opacity-100"
                )}
              ></span>
            </div>
            <Typography variant="base-s-semibold" className="line-clamp-1">
              {title}
            </Typography>
          </div>
        </div>
      </Card>
    </Link>
  );
};
