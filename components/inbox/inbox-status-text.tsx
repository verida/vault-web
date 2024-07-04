import { InboxType } from "@/features/inbox/types";

import { Failed } from "../icons/failed";
import { Success } from "../icons/success";
import { Typography } from "../typography";

interface InboxStatusProps {
  status?: "accept" | "decline";
  inboxType?: InboxType;
}

export const InboxStatusText: React.FC<InboxStatusProps> = (props) => {
  const { status, inboxType } = props;

  if (inboxType === InboxType.MESSAGE) {
    return <></>;
  }

  if (status === "accept") {
    return (
      <div className="flex items-center gap-2">
        <Success />
        <Typography variant="base-semibold">Accepted</Typography>
      </div>
    );
  }

  if (status === "decline")
    return (
      <div className="flex items-center gap-2">
        <Failed />
        <Typography variant="base-semibold">Declined</Typography>
      </div>
    );

  return <></>;
};
