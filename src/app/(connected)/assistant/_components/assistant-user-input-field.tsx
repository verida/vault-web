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
import { Textarea } from "@/components/ui/textarea"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"

export type AssistantUserInputFieldProps = Omit<
  React.ComponentProps<"div">,
  "children"
>

export function AssistantUserInputField(props: AssistantUserInputFieldProps) {
  const { ...divProps } = props

  const { userInput, processUserInput, updateUserPrompt, isProcessing } =
    useAssistants()

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleUserPromptChange: ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (event) => {
        updateUserPrompt(event.target.value)
      },
      [updateUserPrompt]
    )

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        processUserInput()
      }
    },
    [processUserInput]
  )

  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div {...divProps}>
      <Textarea
        ref={inputRef}
        placeholder="Type your question here"
        value={userInput?.prompt ?? ""}
        onChange={handleUserPromptChange}
        onKeyDown={handleKeyDown}
        className="max-h-40 rounded-xl py-[1.125rem] pl-5 pr-14"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        containerClassName="shadow-md rounded-xl"
        endAdornmentContainerClassName="bottom-0 p-2 flex flex-row gap-1"
        endAdornment={
          <>
            <Button
              variant="primary"
              size="icon"
              onClick={processUserInput}
              disabled={!userInput?.prompt || isProcessing}
            >
              <SendIcon />
            </Button>
          </>
        }
      />
    </div>
  )
}
AssistantUserInputField.displayName = "AssistantUserInputField"
