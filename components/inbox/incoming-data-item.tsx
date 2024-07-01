import Image from "next/image";

import { Typography } from "../typography";

interface IncomingDataItemProps {
  item: Record<string, any>;
}

export const IncomingDataItem: React.FC<IncomingDataItemProps> = ({ item }) => {
  return (
    <div className="space-y-2 rounded-sm bg-neutral-50 p-4">
      <div className="flex items-center gap-2">
        <Image
          src={item.icon || ""}
          width="32"
          height="32"
          alt="incoming-item-icon"
        />
        <Typography variant="heading-5">{item.name}</Typography>
      </div>
      <Typography className="text-secondary-foreground">
        {item.summary}
      </Typography>
    </div>
  );
};
