"use client"

import { MessageSquareMoreIcon, XIcon } from "lucide-react"
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react"

import { AssistantUserInputPromptsMenu } from "@/app/(connected)/assistant/_components/assistant-user-input-prompts-menu"
import { SendIcon } from "@/components/icons/send-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { cn } from "@/styles/utils"

export type AssistantUserInputProps = Omit<
  React.ComponentProps<"div">,
  "children"
>

export function AssistantUserInput(props: AssistantUserInputProps) {
  const { ...divProps } = props

  const {
    userInput,
    processUserInput,
    updateUserPrompt,
    clearUserInput,
    isProcessing,
  } = useAssistants()

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
      <Card className="flex flex-col gap-1 rounded-xl p-3 shadow-md ring-offset-surface focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 hover:border-border-hover md:gap-2 md:p-4">
        <CardContent className="p-0">
          <Textarea
            ref={inputRef}
            placeholder="Ask your assistant"
            value={userInput?.prompt ?? ""}
            onChange={handleUserPromptChange}
            onKeyDown={handleKeyDown}
            className={cn(
              "max-h-32 rounded-none border-none py-1 pl-0 focus-visible:ring-0",
              userInput?.prompt ? "pr-8 sm:pr-10" : "pr-1"
            )}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            endAdornmentContainerClassName="top-0 pt-1 pr-1.5 sm:pr-2.5 flex flex-row gap-1"
            endAdornment={
              userInput?.prompt ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5"
                  onClick={clearUserInput}
                >
                  <XIcon className="size-5 opacity-50 sm:size-6" />
                  <span className="sr-only">Clear user input</span>
                </Button>
              ) : null
            }
          />
        </CardContent>
        <CardFooter className="flex-row justify-between p-0">
          <div className="flex flex-row items-center justify-start gap-2">
            <AssistantUserInputPromptsMenu>
              <Button
                variant="outline"
                size="icon"
                className="size-8 sm:size-10"
              >
                <MessageSquareMoreIcon className="size-5 sm:size-6" />
                <span className="sr-only">Open prompts menu</span>
              </Button>
            </AssistantUserInputPromptsMenu>
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              variant="primary"
              size="icon"
              className="size-8 sm:size-10"
              onClick={processUserInput}
              disabled={!userInput?.prompt || isProcessing}
            >
              <SendIcon className="size-5 sm:size-6" />
              <span className="sr-only">Send to assistant for processing</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
AssistantUserInput.displayName = "AssistantUserInput"
