import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { VeridaNetworkLogo } from "@/components/icons/verida-network-logo"
import { Avatar } from "@/components/ui/avatar"
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
            "size-6 bg-ai-assistant-gradient p-1 text-white sm:size-8",
            isProcessing ? "animate-pulse" : ""
          )}
        >
          <VeridaNetworkLogo className="size-4 sm:size-6" />
        </Avatar>
        <div
          className={cn(
            "prose prose-sm max-w-none pt-1",
            isProcessing ? "animate-pulse" : ""
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              a: ({ node, ...props }) => (
                <a target="_blank" rel="noopener noreferrer" {...props} />
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

type AssistantChatUserMessageProps = {
  message: AssistantChatMessageType
}

function AssistantChatUserMessage(props: AssistantChatUserMessageProps) {
  const { message } = props

  return (
    <div className="text-end">
      <div className="py-1.5">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              a: ({ node, ...props }) => (
                <a target="_blank" rel="noopener noreferrer" {...props} />
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
