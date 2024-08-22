"use client"

import React, { ChangeEventHandler, useCallback, useState } from "react"

import { SendIcon } from "@/components/icons/send-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type AssistantChatInputProps = {
  onSendMessage: (message: string) => void
} & React.ComponentProps<"div">

export function AssistantChatInput(props: AssistantChatInputProps) {
  const { onSendMessage, ...divProps } = props

  const [message, setMessage] = useState("")

  const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setMessage(event.target.value)
    },
    []
  )

  const handleSendClick = useCallback(() => {
    onSendMessage?.(message)
    setMessage("")
  }, [onSendMessage, message])

  return (
    <div {...divProps}>
      <Input
        // TODO: Replace by a text area
        placeholder="Type your prompt here"
        value={message}
        onChange={handleChangeMessage}
        className="h-auto rounded-xl py-[1.125rem] pl-5 pr-14 hover:border-border/30 focus-visible:ring-2"
        containerClassName="shadow-md rounded-xl"
        endAdornment={
          <>
            <Button
              variant="primary"
              size="icon"
              onClick={handleSendClick}
              disabled={!message}
              className="mr-2"
            >
              <SendIcon />
            </Button>
          </>
        }
      />
    </div>
  )
}
