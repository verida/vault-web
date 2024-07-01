import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

import Alert from "@/components/alert";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { CloseSideRight } from "@/components/icons/close-side-right";
import { Failed } from "@/components/icons/failed";
import { Success } from "@/components/icons/success";
import { SearchInput } from "@/components/search-input";
import { Typography } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useInboxAction } from "@/features/inbox/hooks/useInboxAction";
import { InboxType } from "@/features/inbox/types";
import { useVerida } from "@/features/verida";

import { DataRequestItem } from "../data-request-item";
import { InboxDetailsProps } from "../inbox-details";

export const DataRequestDetails: React.FC<InboxDetailsProps> = ({
  message,
}) => {
  const { message: title, data } = message;
  const { openDatastore } = useVerida();

  const [availableData, setAvailableData] = useState<any>();
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { handleAccept, handleReject, isLoading } = useInboxAction();

  const fetchData = async () => {
    try {
      const { requestSchema, filter } = data;

      const requestFilter = filter && typeof filter === "object" ? filter : {};

      const searchFilter = {};

      const query = {
        $and: [requestFilter, searchFilter],
      };

      const datastore = await openDatastore(requestSchema, undefined);

      const result = await datastore?.getMany(query, undefined);

      console.log(result);

      if (result) {
        setAvailableData(result);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (!!openDatastore) fetchData();
  }, [openDatastore]);

  console.log(selectedItems);

  if (isSelecting) {
    return (
      <>
        <DrawerHeader className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3">
            <ArrowLeft
              onClick={() => setIsSelecting(false)}
              className="cursor-pointer"
            />
            <DrawerTitle>Select an Item</DrawerTitle>
          </div>
          <div className="flex items-center space-x-3">
            <SearchInput />
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto p-6">
          <div className="space-y-2">
            {(availableData || []).map((item: any) => (
              <Card key={`card-${item._id}`} className="px-4 py-3">
                <Checkbox
                  defaultChecked={
                    selectedItems.findIndex(
                      (sItem) => sItem._id === item._id
                    ) >= 0
                  }
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      setSelectedItems((prev) =>
                        prev.filter((sItem) => sItem._id !== item._id)
                      );
                    } else {
                      setSelectedItems((prev) => [...prev, item]);
                    }
                  }}
                  label={
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.icon}
                        alt="data-request-item"
                        width="60"
                        height="60"
                        className="aspect-square rounded-full border object-cover"
                      />
                      <div>
                        <Typography variant="heading-5">{item.name}</Typography>
                        <Typography
                          variant="base-s-semibold"
                          className="text-secondary-foreground"
                        >
                          {item.summary}
                        </Typography>
                        <Typography
                          variant="base-s-semibold"
                          className="text-secondary-foreground/60"
                        >
                          {moment(new Date(item.insertedAt)).format(
                            "DD/MM/YY hh:mm"
                          )}
                        </Typography>
                      </div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        </div>

        <DrawerFooter>
          <Alert text="Carefully review your seletion" />
          <Button
            className="bg-purple-500 hover:bg-purple-700"
            onClick={() => setIsSelecting(false)}
            disabled={selectedItems.length <= 0}
          >
            Confirm Selection
          </Button>
        </DrawerFooter>
      </>
    );
  }

  return (
    <>
      <DrawerHeader className="flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-3">
          <CloseSideRight />
          <DrawerTitle>Data Request</DrawerTitle>
        </div>
        {data.status === "accept" && (
          <div className="flex items-center gap-2">
            <Success />
            <Typography variant="base-semibold">Accepted</Typography>
          </div>
        )}
        {data.status === "decline" && (
          <div className="flex items-center gap-2">
            <Failed />
            <Typography variant="base-semibold">Declined</Typography>
          </div>
        )}
      </DrawerHeader>

      <div className="p-6">
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

        <div className="mt-6 rounded-lg bg-[#f5f4ff] p-4">
          <Typography variant="base-s-regular">{title}</Typography>
        </div>

        <div className="mt-8">
          <Typography
            variant="base-regular"
            className="text-secondary-foreground"
          >
            The following data is being requested
          </Typography>

          <DataRequestItem
            onAdd={() => setIsSelecting(true)}
            selectedItems={selectedItems}
          />
        </div>
      </div>

      <DrawerFooter>
        <Alert text="Ignore if you don’t recognize this request" />
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={() => handleReject(message, InboxType.DATA_REQUEST, {})}
          >
            Decline
          </Button>
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={() =>
              handleAccept(message, InboxType.DATA_REQUEST, selectedItems)
            }
          >
            Share
          </Button>
        </div>
      </DrawerFooter>
    </>
  );
};
