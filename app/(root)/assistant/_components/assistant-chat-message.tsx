import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { VeridaNetworkLogo } from "@/components/icons/verida-network-logo"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AssistantChatMessage as AssistantChatMessageType } from "@/features/assistant"
import { cn } from "@/lib/utils"

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
        <Avatar
          className={cn(
            "size-6 shrink-0 bg-ai-assistant-gradient p-1 text-white sm:size-8",
            isProcessing ? "animate-pulse" : ""
          )}
        >
          <VeridaNetworkLogo className="size-4 sm:size-6" />
        </Avatar>
        <div className="prose prose-sm max-w-full flex-1 overflow-x-auto pt-1">
          {isProcessing ? (
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-3.5 w-full rounded-full" />
              <Skeleton className="h-3.5 w-11/12 rounded-full" />
              <Skeleton className="h-3.5 w-1/5 rounded-full" />
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
