import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { VeridaNetworkLogo } from "@/components/icons/verida-network-logo"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AssistantChatMessage as AssistantChatMessageType } from "@/features/assistant"
import { cn } from "@/styles/utils"

export type AssistantChatMessageProps = {
  message: AssistantChatMessageType
  isProcessing?: boolean
} & React.ComponentProps<"div">

export function AssistantChatMessage(props: AssistantChatMessageProps) {
  const { message, isProcessing, className, ...divProps } = props

  return (
    <div className={cn("w-full", className)} {...divProps}>
      {message.sender === "assistant" ? (
        <AssistantChatAssistantMessage
          message={message}
          isProcessing={isProcessing}
        />
      ) : (
        <AssistantChatUserMessage message={message} />
      )}
    </div>
  )
}

type AssistantChatAssistantMessageProps = {
  message: AssistantChatMessageType
  isProcessing?: boolean
}
function AssistantChatAssistantMessage(
  props: AssistantChatAssistantMessageProps
) {
  const { message, isProcessing } = props

  return (
    <div className="text-start">
      <div className="flex flex-row gap-3 rounded-xl border bg-white p-4 sm:gap-4">
        <Avatar className="relative size-6 shrink-0 p-1 text-white sm:size-8">
          <div
            className={cn(
              "absolute inset-0 bg-ai-assistant-gradient",
              isProcessing ? "animate-spin-slow" : ""
            )}
          />
          <div className="absolute inset-0 flex flex-row items-center justify-center">
            <VeridaNetworkLogo className="size-4 sm:size-6" />
          </div>
        </Avatar>
        <div className="prose prose-sm max-w-full flex-1 overflow-x-auto pt-1">
          {isProcessing ? (
            <div className="flex w-full flex-col">
              <div className="flex flex-row gap-2">
                <Skeleton className="my-[0.3125rem] h-3.5 w-1/12 rounded-full" />
                <Skeleton className="my-[0.3125rem] h-3.5 w-9/12 rounded-full" />
                <Skeleton className="my-[0.3125rem] h-3.5 flex-1 rounded-full" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="my-[0.3125rem] h-3.5 w-7/12 rounded-full" />
              </div>
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                a: ({ node, ...props }) => (
                  <a target="_blank" rel="noopener noreferrer" {...props} />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                pre: ({ node, ...props }) => (
                  <pre className="overflow-x-auto" {...props} />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                code: ({ node, ...props }) => (
                  <code className="overflow-x-auto" {...props} />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  )
}

type AssistantChatUserMessageProps = {
  message: AssistantChatMessageType
}

function AssistantChatUserMessage(props: AssistantChatUserMessageProps) {
  const { message } = props

  return (
    <div className="text-end">
      <div className="py-1.5">
        <div className="prose prose-sm max-w-full overflow-x-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              a: ({ node, ...props }) => (
                <a target="_blank" rel="noopener noreferrer" {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              pre: ({ node, ...props }) => (
                <pre className="overflow-x-auto" {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              code: ({ node, ...props }) => (
                <code className={"overflow-x-auto"} {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
