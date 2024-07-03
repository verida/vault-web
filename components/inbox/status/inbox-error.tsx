import Image from "next/image";

import ErrorInboxImage from "@/assets/error-inbox.svg";
import { Button } from "@/components/ui/button";

import { Typography } from "../../typography";

export const InboxError = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <Image
        src={ErrorInboxImage}
        width={121}
        height={140}
        alt="error"
        className="h-[105px] md:h-[140px]"
      />
      <Typography variant="heading-4">
        There was an error getting your inbox, Please try again.
      </Typography>
      <Button variant="secondary">Reload</Button>
    </div>
  );
};
