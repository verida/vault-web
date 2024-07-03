import { useInbox } from "@/features/inbox/hooks";

import { Inbox } from "./inbox";

export const InboxWithBadge = () => {
  const { unreadMessageCount } = useInbox();
  return (
    <div className="relative">
      <Inbox />
      {unreadMessageCount > 0 && (
        <div className="absolute right-0 top-0 flex h-4 w-4 -translate-y-[4px] translate-x-[6px] items-center justify-center rounded-full border border-white bg-[#fd4f64] text-[8px] font-semibold text-white">
          {unreadMessageCount}
        </div>
      )}
    </div>
  );
};
