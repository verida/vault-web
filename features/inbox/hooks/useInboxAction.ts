import { useCallback, useState } from "react";

import { useVerida } from "@/features/verida";

import { InboxEntry, InboxType } from "../types";
import { useInboxContext } from "./useInboxContext";

export const useInboxAction = () => {
  const { openDatastore } = useVerida();
  const { messagingEngine } = useInboxContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleAccept = useCallback(
    async (inboxEntry: InboxEntry, type: InboxType, payload: unknown) => {
      try {
        if (inboxEntry.data.status) {
          throw new Error(
            "Data has already been set to " + inboxEntry.data.status
          );
        }

        setIsLoading(true);
        setIsError(false);

        inboxEntry.data.status = "accept";

        switch (type) {
          case InboxType.DATA_REQUEST:
            const { data, sentBy, _id } = inboxEntry;
            const response = { replyId: _id, data: null };

            if (data.userSelect) {
              response.data = payload as any;
            } else {
              const store = await openDatastore(data.requestSchema);
              const foundData = await store.getMany(data.filter || {});
              response.data = [foundData] as any;
            }

            inboxEntry.data.requestedData = response.data;

            await messagingEngine?.send(
              sentBy.did,
              InboxType.DATA_SEND,
              response,
              "Send you the requested data",
              {
                did: sentBy.did,
                recipientContextName: sentBy.context,
              }
            );
            break;
          case InboxType.DATA_SEND:
            const acceptResult = { success: true, errors: [] };
            const dataSent = inboxEntry.data.data;

            for (const i in dataSent) {
              const dataEntry = dataSent[i];

              delete dataEntry._rev;

              try {
                const store = await openDatastore(dataEntry.schema);
                const result = await store.save(dataEntry, {
                  forceUpdate: true,
                });

                if (!result) {
                  acceptResult.success = false;
                  acceptResult.errors.push({
                    dataEntry,
                    errors: store.errors,
                  } as never);
                }
              } catch (error) {
                acceptResult.success = false;
                acceptResult.errors.push({
                  dataEntry,
                  errors: [error],
                } as never);
              }
            }
            break;
          default:
            break;
        }

        inboxEntry.read = true;
        const inbox = await messagingEngine?.getInbox();
        await inbox.privateInbox.save(inboxEntry);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      }
    },
    [openDatastore, messagingEngine]
  );

  const handleReject = useCallback(
    async (inboxEntry: InboxEntry) => {
      if (inboxEntry.data.status) {
        throw new Error(
          "Data has already been set to " + inboxEntry.data.status
        );
      }

      setIsLoading(true);
      setIsError(false);

      try {
        inboxEntry.data.status = "decline";
        inboxEntry.read = true;
        const inbox = await messagingEngine?.getInbox();
        await inbox.privateInbox.save(inboxEntry);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    },
    [messagingEngine]
  );

  return { handleAccept, handleReject, isLoading, isError };
};
