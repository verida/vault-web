import Image from "next/image";

import { cn } from "@/lib/utils";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useMemo } from "react";

interface DataRequestItemProps {
  selectedItems: Record<string, any>[];
  onAdd: () => void;
}

export const DataRequestItem: React.FC<DataRequestItemProps> = ({ selectedItems, onAdd }) => {
  const isAdded = useMemo(() => {
    return selectedItems.length > 0;
  }, [selectedItems]);

  return (
    <Card
      className={cn(
        "mt-4 p-4 border border-border bg-neutral-50 flex flex-col gap-6",
        isAdded ? "bg-[#DFF5ED]" : "bg-neutral-50"
      )}
    >
      <div>
        <h6 className='font-bold'>Employment contract</h6>
        <p className='text-sm'>Name, employer, start and end date, attachments</p>
      </div>

      <div className='flex gap-2 flex-wrap'>
        {selectedItems.map((item) => (
          <div
            className='rounded-full p-2 bg-purple-500 flex text-white text-xs items-center gap-2'
            key={`chip-${item._id}`}
          >
            <Image src={item.icon} alt='' width='24' height='24' />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <Button variant='outline' className='w-full' onClick={onAdd}>
        Add
      </Button>
    </Card>
  );
};
