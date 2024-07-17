import { useEffect, useState } from "react";

import Alert from "@/components/alert";
import {
  ModalSheetBody,
  ModalSheetFooter,
  ModalSheetHeader,
} from "@/components/common/modal-sheet";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useInboxAction } from "@/features/inbox/hooks/useInboxAction";
import { InboxType } from "@/features/inbox/types";
import { useVerida } from "@/features/verida";

import { DataRequestItem } from "../data-request-item";
import { InboxDetailsProps } from "../inbox-details";
import { InboxStatusText } from "../inbox-status-text";
import { RequestDataSelector } from "../request-data-selector";
import { RequesterProfile } from "../requester-profile";

export const DataRequestDetails: React.FC<InboxDetailsProps> = ({
  message,
  onClose,
}) => {
  const { message: title, data, type } = message;
  const { openDatastore } = useVerida();

  const [availableData, setAvailableData] = useState<any>();
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { handleAccept, handleReject, isLoading } = useInboxAction();

  const fetchData = async () => {
    try {
      const { requestSchema, filter } = data;

      const requestFilter = filter && typeof filter === "object" ? filter : {};

      const searchFilter = {};

      const query = {
        $and: [requestFilter, searchFilter],
      };

      const datastore = await openDatastore(requestSchema, undefined);

      const result = await datastore?.getMany(query, undefined);

      if (result) {
        setAvailableData(result);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (!!openDatastore) fetchData();
  }, [openDatastore]);

  if (isSelecting) {
    return (
      <RequestDataSelector
        data={availableData}
        defaultItems={selectedItems}
        onClose={() => setIsSelecting(false)}
        onConfirm={(items: any[]) => {
          setSelectedItems(items);
          setIsSelecting(false);
        }}
      />
    );
  }

  return (
    <>
      <ModalSheetHeader
        title="Data Request"
        actions={<InboxStatusText status={data.status} inboxType={type} />}
        onClose={onClose}
      />

      <ModalSheetBody>
        <RequesterProfile sentAt={message.sentAt} sentBy={message.sentBy} />

        <div className="mt-6 rounded-lg bg-[#f5f4ff] p-4">
          <Typography variant="base-s-regular">{title}</Typography>
        </div>

        <div className="mt-8">
          <Typography
            variant="base-regular"
            className="text-secondary-foreground"
          >
            The following data is being requested
          </Typography>

          <DataRequestItem
            onAdd={() => setIsSelecting(true)}
            selectedItems={selectedItems}
          />
        </div>
      </ModalSheetBody>

      <ModalSheetFooter>
        {data.status ? (
          <Button className="w-full" onClick={onClose}>
            Close
          </Button>
        ) : (
          <>
            <Alert text="Ignore if you don’t recognize this request" />
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="secondary"
                disabled={isLoading}
                onClick={() =>
                  handleReject(message, InboxType.DATA_REQUEST, {})
                }
              >
                Decline
              </Button>
              <Button
                disabled={isLoading}
                onClick={() =>
                  handleAccept(message, InboxType.DATA_REQUEST, selectedItems)
                }
              >
                Share
              </Button>
            </div>
          </>
        )}
      </ModalSheetFooter>
    </>
  );
};
