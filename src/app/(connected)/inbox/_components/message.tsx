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
  const { message: inboxItem, onClose } = props
  const { message, data } = inboxItem
  const itemData = !isEmpty(data.data) ? data.data[0] : null

  const { handleAccept, isLoading } = useInboxAction()
  return (
    <>
      <ModalSheetHeader title="Message" actions={<></>} onClose={onClose} />

      <ModalSheetBody>
        <RequesterProfile sentAt={inboxItem.sentAt} sentBy={inboxItem.sentBy} />

        <div className="mt-6 space-y-2 rounded-lg bg-primary/5 p-4">
          <Typography>{message}</Typography>
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
              <Button asChild variant="outline" className="w-full">
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
              onClick={() => handleAccept(inboxItem, InboxType.MESSAGE, {})}
              disabled={isLoading}
              className="w-full"
            >
              Mark as read
            </Button>
          </>
        )}
      </ModalSheetFooter>
    </>
  )
}
