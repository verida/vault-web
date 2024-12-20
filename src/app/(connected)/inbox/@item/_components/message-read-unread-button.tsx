"use client"

import { MailIcon, MailOpenIcon } from "lucide-react"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Logger } from "@/features/telemetry/logger"
import { useInboxMessageReadHandler } from "@/features/verida-inbox/hooks/use-inbox-message-read-handler"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { cn } from "@/styles/utils"

const logger = Logger.create("verida-inbox")

type MessageReadUnreadButtonProps = {
  messageRecord: VeridaInboxMessageRecord
} & Omit<React.ComponentProps<typeof Button>, "onClick" | "children">

export function MessageReadUnreadButton(props: MessageReadUnreadButtonProps) {
  const {
    messageRecord,
    variant = "outline",
    size = "icon",
    className,
    ...buttonProps
  } = props

  const [isProcessing, setIsProcessing] = useState(false)

  const { markAsReadAsync, markAsUnreadAsync } = useInboxMessageReadHandler()

  const handleClick = useCallback(async () => {
    if (isProcessing) {
      return
    }
    setIsProcessing(true)
    try {
      if (messageRecord.read) {
        await markAsUnreadAsync({ messageRecord })
      } else {
        await markAsReadAsync({ messageRecord })
      }
    } catch (error) {
      logger.error(error)
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, markAsUnreadAsync, markAsReadAsync, messageRecord])

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
          {messageRecord.read ? (
            <MailIcon className="size-5 shrink-0" />
          ) : (
            <MailOpenIcon className="size-5 shrink-0" />
          )}
          <span className="sr-only">
            {messageRecord.read ? "Mark as unread" : "Mark as read"}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {messageRecord.read ? "Mark as unread" : "Mark as read"}
      </TooltipContent>
    </Tooltip>
  )
}
MessageReadUnreadButton.displayName = "MessageReadUnreadButton"
