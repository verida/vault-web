"use client"

import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react"

import { SendIcon } from "@/components/icons/send-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"

export type AssistantPromptInputProps = React.ComponentProps<"div">

export function AssistantPromptInput(props: AssistantPromptInputProps) {
  const { ...divProps } = props

  const {
    userInput,
    sendUserInputToAssistant,
    updateUserPrompt,
    isProcessing,
  } = useAssistants()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleUserPromptChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        updateUserPrompt(event.target.value)
      },
      [updateUserPrompt]
    )

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        sendUserInputToAssistant()
      }
    },
    [sendUserInputToAssistant]
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
        value={userInput?.prompt ?? ""}
        onChange={handleUserPromptChange}
        onKeyDown={handleKeyDown}
        className="h-auto rounded-xl py-[1.125rem] pl-5 pr-14"
        containerClassName="shadow-md rounded-xl"
        endAdornment={
          <>
            <Button
              variant="primary"
              size="icon"
              onClick={sendUserInputToAssistant}
              disabled={!userInput?.prompt || isProcessing}
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
