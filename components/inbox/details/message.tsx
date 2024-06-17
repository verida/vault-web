import { InboxDetailsProps } from "../inbox-details";

export const InboxMessageDetails: React.FC<InboxDetailsProps> = ({ message }) => {
  const { message: title } = message;
  return (
    <div className='rounded-lg bg-[#f5f4ff] m-6 p-4'>
      <h5 className='text-[#041133] font-semibold'>{title}</h5>
    </div>
  );
};
