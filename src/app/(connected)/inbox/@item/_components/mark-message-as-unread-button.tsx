"use client"

import { MailIcon } from "lucide-react"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Logger } from "@/features/telemetry/logger"
import { useInboxMessageMarkAsUnread } from "@/features/verida-inbox/hooks/use-inbox-message-mark-as-unread"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { cn } from "@/styles/utils"

const logger = Logger.create("verida-inbox")

type MarkMessageAsUnreadButtonProps = {
  messageRecord: VeridaInboxMessageRecord
  onMarkAsUnread?: () => void
} & Omit<React.ComponentProps<typeof Button>, "onClick" | "children">

export function MarkMessageAsUnreadButton(
  props: MarkMessageAsUnreadButtonProps
) {
  const {
    messageRecord,
    onMarkAsUnread,
    variant = "outline",
    size = "icon",
    className,
    ...buttonProps
  } = props

  const [isProcessing, setIsProcessing] = useState(false)

  const { markAsUnreadAsync } = useInboxMessageMarkAsUnread()

  const handleClick = useCallback(async () => {
    if (isProcessing || !messageRecord.read) {
      return
    }
    setIsProcessing(true)
    try {
      await markAsUnreadAsync({ messageRecord })
      onMarkAsUnread?.()
    } catch (error) {
      logger.error(error)
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, markAsUnreadAsync, messageRecord, onMarkAsUnread])

  if (!messageRecord.read) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(className)}
          onClick={handleClick}
          disabled={isProcessing}
          {...buttonProps}
        >
          <MailIcon className="size-5 shrink-0" />
          <span className="sr-only">Mark as unread</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Mark as unread</TooltipContent>
    </Tooltip>
  )
}
MarkMessageAsUnreadButton.displayName = "MarkMessageAsUnreadButton"
