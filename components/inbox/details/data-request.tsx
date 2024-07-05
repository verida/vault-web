import Image from "next/image";
import { useEffect, useState } from "react";

import SuccessShareImage from "@/assets/success.svg";
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

  const { handleAccept, handleReject, isLoading } = useInboxAction();

  const onClickShare = async () => {
    await handleAccept(message, InboxType.DATA_REQUEST, selectedItems);
    setShared(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  if (shared) {
    return (
      <>
        <ModalSheetHeader
          title="Data Request"
          actions={<InboxStatusText status={data.status} />}
          onClose={onClose}
        />
        <ModalSheetBody>
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              src={SuccessShareImage}
              width={120}
              height={140}
              alt="success"
              className="h-[105px] md:h-[140px]"
            />
            <Typography variant="heading-4" className="mt-6">
              Success!
            </Typography>
            <Typography className="mt-2 text-secondary-foreground">
              You successfully shared{" "}
              <b className="text-primary-foreground">
                {requestSchemaData.title}
              </b>{" "}
              to <b className="text-primary-foreground">{sentBy.name}</b>
            </Typography>
          </div>
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
                onClick={() => handleReject(message)}
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
