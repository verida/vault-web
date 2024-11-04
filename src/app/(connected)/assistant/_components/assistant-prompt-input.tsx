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

export type AssistantPromptInputProps = {
  onSend: (prompt: string) => void
  isProcessing: boolean
} & React.ComponentProps<"div">

export function AssistantPromptInput(props: AssistantPromptInputProps) {
  const { onSend, isProcessing, ...divProps } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const [userPrompt, setUserPrompt] = useState("")

  const handleUserPromptChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setUserPrompt(event.target.value)
    }, [])

  const handleSend = useCallback(() => {
    if (userPrompt && !isProcessing) {
      onSend?.(userPrompt)
      setUserPrompt("")
    }
  }, [onSend, userPrompt, isProcessing])

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        handleSend()
      }
    },
    [handleSend]
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
        value={userPrompt}
        onChange={handleUserPromptChange}
        onKeyDown={handleKeyDown}
        className="h-auto rounded-xl py-[1.125rem] pl-5 pr-14"
        containerClassName="shadow-md rounded-xl"
        endAdornment={
          <>
            <Button
              variant="primary"
              size="icon"
              onClick={handleSend}
              disabled={!userPrompt || isProcessing}
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
