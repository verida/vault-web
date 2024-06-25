import Image from "next/image";
import Link from "next/link";

import BinanceImage from "@/assets/binance.svg";
import { inboxTypes } from "@/features/inbox/constants";
import { InboxEntry } from "@/features/inbox/types";
import { cn, formatDate } from "@/lib/utils";

import { Failed } from "../icons/failed";
import { Success } from "../icons/success";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

interface InboxRowItemProps {
  message: InboxEntry;
  onClick: (_id: string) => void;
}

export const InboxRowItem: React.FC<InboxRowItemProps> = ({
  message,
  onClick,
}) => {
  const { _id, message: title, read, sentAt, sentBy, type, data } = message;
  const InboxTypeIcon = inboxTypes[type].icon;

  return (
    <Card
      className="flex w-full cursor-pointer rounded-lg"
      onClick={() => onClick(_id)}
    >
      {/* desktop card */}
      <div className="hidden min-h-[72px] w-full grid-cols-[1fr_1fr_1fr_160px] text-sm md:grid">
        <div className="flex shrink items-center gap-3 px-4">
          <span
            className={cn(
              "size-2 rounded-full bg-purple-500",
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
            <Success className="absolute bottom-0 right-0 size-4 rounded-full border border-white" />
          </div>
          <p className="font-semibold text-neutral-600">{sentBy.name}</p>
        </div>
        <div className="flex shrink items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <InboxTypeIcon />
            <p className="text-sm font-semibold">{inboxTypes[type].text}</p>
          </div>

          {data.status === "accept" && (
            <div className="flex items-center gap-2">
              <Success />
              <p className="text-sm font-semibold">Accepted</p>
            </div>
          )}
          {data.status === "decline" && (
            <div className="flex items-center gap-2">
              <Failed />
              <p className="text-sm font-semibold">Declined</p>
            </div>
          )}
        </div>
        <p className="flex items-center overflow-hidden text-ellipsis whitespace-nowrap px-4 font-semibold">
          {title}
        </p>
        <p className="flex items-center px-4 text-gray-500">
          {formatDate(sentAt)}
        </p>
      </div>

      {/* mobile card */}
      <div className="flex w-full items-start space-x-3 p-4 md:hidden">
        <div className="relative">
          <Avatar>
            {sentBy.avatar?.uri && (
              <AvatarImage src={sentBy.avatar?.uri} asChild>
                <Image src={sentBy.avatar?.uri} width={48} height={48} alt="" />
              </AvatarImage>
            )}
            <AvatarFallback>{"U"}</AvatarFallback>
          </Avatar>
          <Success className="absolute bottom-0 right-0 size-4 rounded-full border border-white" />
        </div>
        <div className="flex-grow space-y-[6px]">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-neutral-600">{sentBy.name}</p>
            <p className="text-[13px] font-semibold opacity-60">15:40</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <InboxTypeIcon className="h-4 w-4" />
              <p className="text-xs font-semibold">{inboxTypes[type].text}</p>
            </div>
            <span
              className={cn(
                "size-2 rounded-full bg-purple-500",
                read ? "opacity-0" : "opacity-100"
              )}
            ></span>
          </div>
          <p className="line-clamp-1 text-sm font-semibold">{title}</p>
        </div>
      </div>
    </Card>
  );
};
