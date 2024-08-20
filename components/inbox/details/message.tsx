import { isEmpty } from "lodash"

import {
  ModalSheetBody,
  ModalSheetFooter,
  ModalSheetHeader,
} from "@/components/common/modal-sheet"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { ButtonLink } from "@/components/ui/button-link"
import { useInboxAction } from "@/features/inbox/hooks/useInboxAction"
import { InboxType } from "@/features/inbox/types"

import { InboxDetailsProps } from "../inbox-details"
import { RequesterProfile } from "../requester-profile"

export const InboxMessageDetails: React.FC<InboxDetailsProps> = ({
  message,
  onClose,
}) => {
  const { message: title, data } = message
  const itemData = !isEmpty(data.data) ? data.data[0] : null

  const { handleAccept, isLoading } = useInboxAction()
  return (
    <>
      <ModalSheetHeader title="Message" actions={<></>} onClose={onClose} />

      <ModalSheetBody>
        <RequesterProfile sentAt={message.sentAt} sentBy={message.sentBy} />

        <div className="mt-6 space-y-2 rounded-lg bg-[#f5f4ff] p-4">
          <Typography>{title}</Typography>
          <Typography variant="base-s-regular">{itemData.message}</Typography>
        </div>
      </ModalSheetBody>

      <ModalSheetFooter>
        {data.status ? (
          <Button className="w-full" onClick={onClose}>
            Close
          </Button>
        ) : (
          <>
            {!!itemData.link && (
              <ButtonLink href={itemData.link.url}>
                {itemData.link.text}
              </ButtonLink>
            )}
            <Button
              onClick={() => handleAccept(message, InboxType.MESSAGE, {})}
              disabled={isLoading}
            >
              Mark as read
            </Button>
          </>
        )}
      </ModalSheetFooter>
    </>
  )
}
