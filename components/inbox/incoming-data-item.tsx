import Image from "next/image";

interface IncomingDataItemProps {
  item: Record<string, any>;
}

export const IncomingDataItem: React.FC<IncomingDataItemProps> = ({ item }) => {
  return (
    <div className='bg-neutral-50 rounded-sm p-4 space-y-2'>
      <div className='flex gap-2 items-center'>
        <Image src={item.icon || ""} width='32' height='32' alt='incoming-item-icon' />
        <h4 className='font-bold'>{item.name}</h4>
      </div>
      <p className='text-sm font-semibold'>{item.summary}</p>
    </div>
  );
};
