"use client"

import { MailQuestionIcon } from "lucide-react"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Logger } from "@/features/telemetry/logger"
import { useResetMessageStatus } from "@/features/verida-inbox/hooks/use-reset-message-status"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { cn } from "@/styles/utils"

const logger = Logger.create("verida-inbox")

export interface ResetMessageStatusButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick" | "children"> {
  messageRecord: VeridaInboxMessageRecord
  onResetStatus?: () => void
}

export function ResetMessageStatusButton(props: ResetMessageStatusButtonProps) {
  const {
    messageRecord,
    onResetStatus,
    variant = "outline",
    size = "icon",
    className,
    ...buttonProps
  } = props

  const [isProcessing, setIsProcessing] = useState(false)

  const { resetStatusAsync } = useResetMessageStatus()

  const handleClick = useCallback(async () => {
    if (isProcessing) {
      return
    }

    setIsProcessing(true)
    try {
      await resetStatusAsync({ messageRecord })
      onResetStatus?.()
    } catch (error) {
      logger.error(error)
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, resetStatusAsync, messageRecord, onResetStatus])

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
          <MailQuestionIcon className="size-5 shrink-0" />
          <span className="sr-only">Reset status</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>[DEV ONLY] Reset status</TooltipContent>
    </Tooltip>
  )
}
ResetMessageStatusButton.displayName = "ResetMessageStatusButton"
