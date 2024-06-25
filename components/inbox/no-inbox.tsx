import Image from "next/image";

import NoInboxImage from "@/assets/no-inbox.svg";

export const NoInbox = () => {
  return (
    <>
      <Image
        src={NoInboxImage}
        width={100}
        height={140}
        alt="no-inbox"
        className="h-[105px] md:h-[140px]"
      />
      <div className="mt-8 space-y-2 text-center">
        <h4 className="text-xl font-semibold">Nothing in Your Inbox Yet</h4>
        <p className="text-gray-500">
          When new messages arrive, they&apos;ll show up here.
        </p>
      </div>
    </>
  );
};
