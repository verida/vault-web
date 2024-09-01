"use client"

import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { SendIcon } from "@/components/icons/send-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type AssistantChatInputProps = {
  onSendMessage: (message: string) => void
  isProcessing: boolean
} & React.ComponentProps<"div">

export function AssistantChatInput(props: AssistantChatInputProps) {
  const { onSendMessage, isProcessing, ...divProps } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const [message, setMessage] = useState("")

  const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setMessage(event.target.value)
    },
    []
  )

  const handleSendMessage = useCallback(() => {
    if (message && !isProcessing) {
      onSendMessage?.(message)
      setMessage("")
    }
  }, [onSendMessage, message, isProcessing])

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage]
  )

  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div {...divProps}>
      <Input
        ref={inputRef}
        // TODO: Replace by a text area
        placeholder="Type your question here"
        value={message}
        onChange={handleChangeMessage}
        onKeyDown={handleKeyDown}
        className="h-auto rounded-xl py-[1.125rem] pl-5 pr-14"
        containerClassName="shadow-md rounded-xl"
        endAdornment={
          <>
            <Button
              variant="primary"
              size="icon"
              onClick={handleSendMessage}
              disabled={!message || isProcessing}
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
