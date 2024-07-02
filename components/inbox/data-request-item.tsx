import Image from "next/image";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

import { Typography } from "../typography";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Chip } from "../common/chip";
import { Plus } from "../icons/plus";
import { Check } from "../icons/check";

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
        "bg-secondary-activity-sending mt-4 flex flex-col gap-6 border border-border p-4",
        isAdded
          ? "border-secondary-activity-receiving bg-secondary-activity-receiving"
          : ""
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
            <Chip
              key={`chip-${item._id}`}
              id={item._id}
              icon={item.icon}
              text={item.name}
            />
          ))}
        </div>
      )}

      {isAdded ? (
        <Button variant="secondary" className="text-approved w-full gap-2">
          <Check />
          Added
        </Button>
      ) : (
        <Button variant="secondary" className="w-full gap-2" onClick={onAdd}>
          <Plus />
          Add
        </Button>
      )}
    </Card>
  );
};
