import { useEffect, useState } from "react";

import Alert from "@/components/alert";
import {
  ModalSheetBody,
  ModalSheetFooter,
  ModalSheetHeader,
} from "@/components/common/modal-sheet";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { useInboxAction } from "@/features/inbox/hooks/useInboxAction";
import { InboxType } from "@/features/inbox/types";

import { DataRequestItem } from "../data-request-item";
import { InboxDetailsProps } from "../inbox-details";
import { InboxStatusText } from "../inbox-status-text";
import { RequestDataSelector } from "../request-data-selector";
import { RequesterProfile } from "../requester-profile";
import { InboxError } from "../status/inbox-error";
import { InboxLoading } from "../status/inbox-loading";
import { InboxSuccess } from "../status/inbox-success";

export const DataRequestDetails: React.FC<InboxDetailsProps> = ({
  message,
  onClose,
}) => {
  const { message: title, data, sentBy } = message;
  const { fallbackAction, requestSchema, filter } = data;

  const [requestSchemaData, setRequestSchemaData] = useState<any>({});
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>(
    data.requestedData || []
  );

  const { handleAccept, handleReject, isLoading, isError } = useInboxAction();

  const onClickShare = async () => {
    try {
      setShared(false);
      await handleAccept(message, InboxType.DATA_REQUEST, selectedItems);
      setShared(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onRemoveChip = (_id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const fetchData = async () => {
    try {
      const { requestSchema } = data;

      await fetch(requestSchema)
        .then((res) => res.json())
        .then((res) => {
          setRequestSchemaData({
            title: res.title,
            description: res.description,
          });
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  const onClickDecline = async () => {
    await handleReject(message);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <ModalSheetHeader
          title="Data Request"
          actions={<InboxStatusText status={data.status} />}
          onClose={onClose}
        />
        <ModalSheetBody>
          <InboxLoading title="Sharing..." description="Please wait a moment" />
        </ModalSheetBody>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <ModalSheetHeader
          title="Data Request"
          actions={<InboxStatusText status={data.status} />}
          onClose={onClose}
        />
        <ModalSheetBody>
          <InboxError
            description="There's been an error when sharing the data"
            onClick={onClickShare}
          />
        </ModalSheetBody>
      </>
    );
  }

  if (shared) {
    return (
      <>
        <ModalSheetHeader
          title="Data Request"
          actions={<InboxStatusText status={data.status} />}
          onClose={onClose}
        />
        <ModalSheetBody>
          <InboxSuccess
            title="Success!"
            description={
              <>
                You successfully shared{" "}
                <b className="text-primary-foreground">
                  {requestSchemaData.title}
                </b>{" "}
                to <b className="text-primary-foreground">{sentBy.name}</b>
              </>
            }
          />
        </ModalSheetBody>
        <ModalSheetFooter>
          <Button onClick={() => setShared(false)}>Done</Button>
        </ModalSheetFooter>
      </>
    );
  }

  if (isSelecting) {
    return (
      <RequestDataSelector
        schemaUrl={requestSchema}
        filter={filter}
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
        actions={<InboxStatusText status={data.status} />}
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
            data={requestSchemaData}
            onAdd={() => setIsSelecting(true)}
            selectedItems={selectedItems}
            disabled={!!data.status}
            onRemoveChip={onRemoveChip}
          />
        </div>

        {fallbackAction && (
          <div>
            <Typography
              variant="base-regular"
              className="text-secondary-foreground"
            >
              If you don't have the requested data
            </Typography>

            <ButtonLink href={fallbackAction.url}>
              {fallbackAction.label}
            </ButtonLink>
          </div>
        )}
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
                onClick={onClickDecline}
              >
                Decline
              </Button>
              <Button
                disabled={isLoading || !selectedItems.length}
                onClick={() => onClickShare()}
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
