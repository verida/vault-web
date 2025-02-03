import { Row, flexRender } from "@tanstack/react-table"
import { useMemo } from "react"

import { DataTableBaseRow } from "@/components/data-table/data-table-base-row"
import { Typography } from "@/components/typography"
import { Skeleton } from "@/components/ui/skeleton"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { InboxMessageTypeIndicator } from "@/features/verida-inbox/components/inbox-message-type-indicator"
import { InboxMessageUnreadIndicator } from "@/features/verida-inbox/components/inbox-message-unread-indicator"
import { InboxMessageStatusIndicator } from "@/features/verida-inbox/components/inbox.message-status-indicator"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { UserYourselfBadge } from "@/features/verida-profile/components/user-yourself-badge"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export interface InboxMessagesTableRowProps
  extends Omit<React.ComponentProps<typeof DataTableBaseRow>, "children"> {
  row: Row<VeridaInboxMessageRecord>
}

export function InboxMessagesTableRow(props: InboxMessagesTableRowProps) {
  const { row, className, ...cardProps } = props

  const { read, sentBy, type } = row.original

  const { did } = useVerida()

  const { profile, isLoading } = useVeridaProfile({
    did: sentBy.did,
  })

  const messageCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "message")
  }, [row])

  const sentAtCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "sentAt")
  }, [row])

  return (
    <DataTableBaseRow className={cn(className)} {...cardProps}>
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex flex-row items-start gap-3">
          <ProfileAvatar
            profile={profile}
            isLoading={isLoading}
            className="size-10"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex flex-row items-center justify-between gap-1">
              <div className="flex flex-row gap-1.5">
                {profile ? (
                  <>
                    <div
                      className={cn(
                        "min-w-0",
                        profile?.name ? "" : "italic text-muted-foreground"
                      )}
                    >
                      <Typography
                        variant={read ? "base-regular" : "base-semibold"}
                        className="h-5 truncate"
                      >
                        {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
                      </Typography>
                    </div>
                  </>
                ) : (
                  <Skeleton className="my-[0.1875rem] h-3.5 w-32" />
                )}
                {did === sentBy.did && (
                  <UserYourselfBadge className="self-start" />
                )}
              </div>
              <div className="text-muted-foreground">
                <Typography
                  variant={read ? "base-s-regular" : "base-s-semibold"}
                  className="truncate"
                >
                  {sentAtCell
                    ? flexRender(
                        sentAtCell.column.columnDef.cell,
                        sentAtCell.getContext()
                      )
                    : EMPTY_VALUE_FALLBACK}
                </Typography>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-1">
              <div className="text-muted-foreground">
                <Typography
                  variant={read ? "base-s-regular" : "base-s-semibold"}
                >
                  {sentBy.context &&
                  sentBy.context !== VERIDA_VAULT_CONTEXT_NAME
                    ? `Via ${sentBy.context}`
                    : ""}
                </Typography>
              </div>
              {read ? null : <InboxMessageUnreadIndicator />}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            variant={read ? "base-regular" : "base-semibold"}
            className="line-clamp-2"
          >
            {messageCell
              ? flexRender(
                  messageCell.column.columnDef.cell,
                  messageCell.getContext()
                )
              : EMPTY_VALUE_FALLBACK}
          </Typography>
          <div className="flex flex-row items-center gap-2">
            <InboxMessageTypeIndicator type={type} isMessageUnread={!read} />
            <InboxMessageStatusIndicator
              messageType={type}
              messageData={row.original.data}
              isMessageUnread={!read}
            />
          </div>
        </div>
      </div>
      <div className="hidden flex-row gap-6 md:flex">
        <div className="flex w-64 shrink-0 flex-row items-center gap-3">
          <InboxMessageUnreadIndicator
            className={cn(read ? "opacity-0" : "opacity-100")}
          />
          <ProfileAvatar
            profile={profile}
            isLoading={isLoading}
            className="size-10"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex flex-row gap-1.5">
              {profile ? (
                <>
                  <div
                    className={cn(
                      "min-w-0",
                      profile?.name ? "" : "italic text-muted-foreground"
                    )}
                  >
                    <Typography
                      variant={read ? "base-regular" : "base-semibold"}
                      className="h-5 truncate"
                    >
                      {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
                    </Typography>
                  </div>
                </>
              ) : (
                <Skeleton className="my-[0.1875rem] h-3.5 w-32" />
              )}
              {did === sentBy.did && (
                <UserYourselfBadge className="self-start" />
              )}
            </div>
            <div className="text-muted-foreground">
              <Typography variant={read ? "base-s-regular" : "base-s-semibold"}>
                {sentBy.context && sentBy.context !== VERIDA_VAULT_CONTEXT_NAME
                  ? `Via ${sentBy.context}`
                  : ""}
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-32 shrink-0">
          <div className="flex flex-col gap-2">
            <InboxMessageTypeIndicator type={type} isMessageUnread={!read} />
            <InboxMessageStatusIndicator
              messageType={type}
              messageData={row.original.data}
              isMessageUnread={!read}
            />
          </div>
        </div>
        <div className="flex-1">
          <Typography
            variant={read ? "base-regular" : "base-semibold"}
            className="line-clamp-2"
          >
            {messageCell
              ? flexRender(
                  messageCell.column.columnDef.cell,
                  messageCell.getContext()
                )
              : EMPTY_VALUE_FALLBACK}
          </Typography>
        </div>
        <div className="w-20 shrink-0 self-center text-right text-muted-foreground">
          <Typography
            variant={read ? "base-regular" : "base-semibold"}
            className="truncate"
          >
            {sentAtCell
              ? flexRender(
                  sentAtCell.column.columnDef.cell,
                  sentAtCell.getContext()
                )
              : EMPTY_VALUE_FALLBACK}
          </Typography>
        </div>
      </div>
    </DataTableBaseRow>
  )
}
InboxMessagesTableRow.displayName = "InboxMessagesTableRow"
