import Image from "next/image";

import NoInboxImage from "@/assets/no-inbox.svg";

import { Typography } from "../../typography";

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
        <Typography variant="heading-4">Nothing in Your Inbox Yet</Typography>
        <Typography
          variant="base-regular"
          className="text-secondary-foreground"
        >
          When new messages arrive, they&apos;ll show up here.
        </Typography>
      </div>
    </>
  );
};
