import Image from "next/image";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

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
        isAdded ? "bg-[#DFF5ED]" : "bg-neutral-50"
      )}
    >
      <div>
        <h6 className="font-bold">Employment contract</h6>
        <p className="text-sm">
          Name, employer, start and end date, attachments
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <div
            className="flex items-center gap-2 rounded-full bg-purple-500 p-2 text-xs text-white"
            key={`chip-${item._id}`}
          >
            <Image src={item.icon} alt="" width="24" height="24" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full" onClick={onAdd}>
        Add
      </Button>
    </Card>
  );
};
