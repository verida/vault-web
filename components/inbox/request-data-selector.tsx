import moment from "moment";
import Image from "next/image";
import { useState } from "react";

import Alert from "../alert";
import { ArrowLeft } from "../icons/arrow-left";
import { SearchInput } from "../search-input";
import { Typography } from "../typography";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

interface RequestDataSelectorProps {
  data?: any[];
  defaultItems: any[];
  onClose: () => void;
  onConfirm: (items: any[]) => void;
}

export const RequestDataSelector: React.FC<RequestDataSelectorProps> = (
  props
) => {
  const { data, onClose, onConfirm, defaultItems } = props;

  const [selectedItems, setSelectedItems] = useState<any[]>(defaultItems);

  return (
    <>
      <DrawerHeader className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <ArrowLeft onClick={() => onClose()} className="cursor-pointer" />
          <DrawerTitle>Select an Item</DrawerTitle>
        </div>
        <div className="flex items-center space-x-3">
          <SearchInput className="w-full" />
        </div>
      </DrawerHeader>

      <DrawerBody className="overflow-y-auto p-6">
        <div className="space-y-2">
          {(data || []).map((item: any) => (
            <Card
              key={`card-${item._id}`}
              className="flex items-center px-4 py-3"
            >
              <label
                htmlFor={item._id}
                className="flex flex-grow items-center gap-2"
              >
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
                    {moment(new Date(item.insertedAt)).format("DD/MM/YY hh:mm")}
                  </Typography>
                </div>
              </label>
              <Checkbox
                defaultChecked={
                  selectedItems.findIndex((sItem) => sItem._id === item._id) >=
                  0
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
                id={item._id}
              />
            </Card>
          ))}
        </div>
      </DrawerBody>

      <DrawerFooter>
        <Alert text="Carefully review your seletion" />
        <Button
          onClick={() => onConfirm(selectedItems)}
          disabled={selectedItems.length <= 0}
        >
          Confirm Selection
        </Button>
      </DrawerFooter>
    </>
  );
};
