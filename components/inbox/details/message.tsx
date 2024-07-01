import { isEmpty } from "lodash";
import Image from "next/image";

import { CloseSideRight } from "@/components/icons/close-side-right";
import { Failed } from "@/components/icons/failed";
import { Success } from "@/components/icons/success";
import { Typography } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { InboxType } from "@/features/inbox/types";

import { InboxDetailsProps } from "../inbox-details";

export const InboxMessageDetails: React.FC<InboxDetailsProps> = ({
  message,
}) => {
  const { message: title, data } = message;
  const itemData = !isEmpty(data.data) ? data.data[0] : null;

  return (
    <>
      <DrawerHeader className="flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-3">
          <CloseSideRight />
          <DrawerTitle>Message</DrawerTitle>
        </div>
      </DrawerHeader>
      <div className="h-full overflow-y-auto py-6">
        <div className="flex items-center space-x-2 px-6">
          <div className="relative">
            <Avatar className="shadow">
              {message.sentBy?.avatar?.uri && (
                <AvatarImage src={message.sentBy?.avatar?.uri} asChild>
                  <Image
                    src={message.sentBy?.avatar?.uri}
                    width={48}
                    height={48}
                    alt=""
                  />
                </AvatarImage>
              )}
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <Typography variant="heading-5">{message.sentBy?.name}</Typography>
            <Typography
              variant="base-s-semibold"
              className="text-secondary-foreground"
            >
              Today at 5:40 pm
            </Typography>
          </div>
        </div>

        <div className="m-6 space-y-2 rounded-lg bg-[#f5f4ff] p-4">
          <Typography variant="base-semibold">{title}</Typography>
          <Typography variant="base-s-regular">{itemData.message}</Typography>
        </div>
      </div>

      <DrawerFooter>
        {!!itemData.link && (
          <Button onClick={() => {}}>{itemData.link.text}</Button>
        )}
      </DrawerFooter>
    </>
  );
};
