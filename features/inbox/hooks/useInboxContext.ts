import { useContext } from "react";

import { InboxContext } from "../contexts/InboxContext";

export const useInboxContext = () => {
  const context = useContext(InboxContext);
  if (context === null) {
    throw new Error("useInbox must be used within a InboxProvider");
  }

  return context;
};
