import { useInbox } from "@/features/inbox/hooks";
import { Inbox } from "./inbox";

export const InboxWithBadge = () => {
  const { unreadMessageCount } = useInbox();
  return (
    <div className='relative'>
      <Inbox />
      {unreadMessageCount > 0 && (
        <div className='absolute right-0 -translate-y-[4px] top-0 translate-x-[6px] bg-[#fd4f64] rounded-full w-4 h-4 border border-white text-white text-[8px] font-semibold flex items-center justify-center'>
          {unreadMessageCount}
        </div>
      )}
    </div>
  );
};
