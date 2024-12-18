"use client"

import { InboxRowItem } from "@/app/(connected)/inbox/_components/inbox-item"
import { NoInbox } from "@/app/(connected)/inbox/_components/no-inbox"
import { useGetVeridaInboxMessages } from "@/features/verida-inbox/hooks/use-get-verida-inbox-messages"

export default function InboxPage() {
  const { inboxMessages, isLoading: isMessagesLoading } =
    useGetVeridaInboxMessages()

  return (
    <div className="flex flex-col gap-6">
      {inboxMessages ? (
        <>
          {inboxMessages.length === 0 ? (
            <NoInbox />
          ) : (
            <div className="flex flex-grow flex-col items-center gap-3">
              {inboxMessages.map((message: any) => (
                <InboxRowItem
                  key={`inbox-row-${message._id}`}
                  message={message}
                  href={`?id=${encodeURIComponent(message._id)}`}
                />
              ))}
            </div>
          )}
        </>
      ) : isMessagesLoading ? (
        <div className="flex flex-grow flex-col items-center gap-3">
          Loading...
        </div>
      ) : null}
    </div>
  )
}
InboxPage.displayName = "InboxPage"
