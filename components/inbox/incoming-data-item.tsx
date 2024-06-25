import Image from "next/image";

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
        <h4 className="font-bold">{item.name}</h4>
      </div>
      <p className="text-sm font-semibold">{item.summary}</p>
    </div>
  );
};
