import Image from "next/image";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

import { Typography } from "../typography";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface DataRequestItemProps {
  selectedItems: Record<string, any>[];
  onAdd: () => void;
}

export const DataRequestItem: React.FC<DataRequestItemProps> = ({
  selectedItems,
  onAdd,
}) => {
  const isAdded = useMemo(() => {
    return selectedItems.length > 0;
  }, [selectedItems]);

  return (
    <Card
      className={cn(
        "mt-4 flex flex-col gap-6 border border-border bg-neutral-50 p-4",
        isAdded ? "border-[#dff5ed] bg-[#DFF5ED]" : "bg-neutral-50"
      )}
    >
      <div>
        <Typography variant="heading-5">Employment contract</Typography>
        <Typography variant="base-s-regular">
          Name, employer, start and end date, attachments
        </Typography>
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <div
              className="flex items-center gap-2 rounded-full bg-purple-500 p-1"
              key={`chip-${item._id}`}
            >
              <Image src={item.icon} alt="" width="24" height="24" />
              <Typography variant="base-s-regular" className="text-primary">
                {item.name}
              </Typography>
            </div>
          ))}
        </div>
      )}

      <Button variant="secondary" className="w-full" onClick={onAdd}>
        Add
      </Button>
    </Card>
  );
};
