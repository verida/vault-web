import Image from "next/image";
import React from "react";

import Alert from "@/components/alert";
import { CloseSideRight } from "@/components/icons/close-side-right";
import { Failed } from "@/components/icons/failed";
import { Success } from "@/components/icons/success";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useInboxAction } from "@/features/inbox/hooks/useInboxAction";
import { InboxType } from "@/features/inbox/types";

import { InboxDetailsProps } from "../inbox-details";
import { IncomingDataItem } from "../incoming-data-item";

const InboxIncomingData: React.FC<InboxDetailsProps> = ({
  message,
  onClose,
}) => {
  const { message: title, data } = message;

  const { handleAccept, handleReject, isLoading } = useInboxAction();

  return (
    <>
      <DrawerHeader className="flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-3">
          <CloseSideRight />
          <DrawerTitle>Incoming Data</DrawerTitle>
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
      </DrawerHeader>

      <div className="overflow-y-auto p-6">
        <div className="flex items-center space-x-2">
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
            <Success className="absolute bottom-0 right-0 size-4 rounded-full border border-white" />
          </div>
          <div>
            <p className="font-medium text-[#041133]">{message.sentBy?.name}</p>
            <p className="text-xs text-neutral-500">Today at 5:40 pm</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-purple-50 p-4">
          <h5 className="text-sm font-semibold text-[#041133]">{title}</h5>
        </div>

        <p className="mt-8 text-sm text-neutral-500">Incoming data item</p>

        <div className="mt-3 space-y-3">
          {data.data &&
            data.data.map((item: any, _ind: number) => (
              <IncomingDataItem item={item} key={`incoming-item-${item._id}`} />
            ))}
        </div>
      </div>

      <DrawerFooter>
        {data.status ? (
          <Button
            variant="default"
            className="h-12 w-full bg-purple-500 font-semibold hover:bg-purple-600"
            onClick={onClose}
          >
            Close
          </Button>
        ) : (
          <>
            <Alert text="Ignore if you don’t recognize this request" />
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-12 w-full font-semibold"
                onClick={() => handleReject(message, InboxType.DATA_SEND, {})}
                disabled={isLoading}
              >
                Decline
              </Button>
              <Button
                className="h-12 w-full bg-purple-500 font-semibold hover:bg-purple-600"
                onClick={() => handleAccept(message, InboxType.DATA_SEND, {})}
                disabled={isLoading}
              >
                Accept
              </Button>
            </div>
          </>
        )}
      </DrawerFooter>
    </>
  );
};

export default InboxIncomingData;
