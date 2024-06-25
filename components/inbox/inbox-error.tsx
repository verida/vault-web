import Image from "next/image";

import ErrorInboxImage from "@/assets/error-inbox.svg";
import { Button } from "@/components/ui/button";

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
      <h4 className="text-xl font-semibold">
        There was an error getting your inbox, Please try again.
      </h4>
      <Button variant="outline">Reload</Button>
    </div>
  );
};
