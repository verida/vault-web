import { isEmpty } from "lodash"
import Link from "next/link"

import { InboxDetailsProps } from "@/app/(connected)/inbox/_components/inbox-details"
import { RequesterProfile } from "@/app/(connected)/inbox/_components/requester-profile"
import {
  ModalSheetBody,
  ModalSheetFooter,
  ModalSheetHeader,
} from "@/components/modal-sheet"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { useInboxAction } from "@/features/inbox/hooks/useInboxAction"
import { InboxType } from "@/features/inbox/types"

export function InboxMessageDetails(props: InboxDetailsProps) {
  const { message, onClose } = props
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
              <Button asChild variant="secondary">
                <Link
                  href={itemData.link.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {itemData.link.text}
                </Link>
              </Button>
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
