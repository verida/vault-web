import { VeridaNetworkLogo } from "@/components/icons/verida-network-logo"
import { Typography } from "@/components/typography"
import { Avatar } from "@/components/ui/avatar"
import { AssistantChatMessage as AssistantChatMessageType } from "@/features/assistant/types"
import { cn } from "@/lib/utils"

export type AssistantChatMessageProps = {
  message: AssistantChatMessageType
} & React.ComponentProps<"div">

export function AssistantChatMessage(props: AssistantChatMessageProps) {
  const { message, className, ...divProps } = props

  return (
    <div className={cn("w-full", className)} {...divProps}>
      {message.sender === "assistant" ? (
        <AssistantChatAssistantMessage message={message} />
      ) : (
        <AssistantChatUserMessage message={message} />
      )}
    </div>
  )
}

type AssistantChatAssistantMessageProps = {
  message: AssistantChatMessageType
}

function AssistantChatAssistantMessage(
  props: AssistantChatAssistantMessageProps
) {
  const { message } = props

  return (
    <div className="text-start">
      <div className="flex flex-row gap-3 rounded-xl border bg-white p-4 sm:gap-4">
        <Avatar className="size-6 bg-ai-assistant-gradient p-1 text-white sm:size-8">
          <VeridaNetworkLogo className="size-4 sm:size-6" />
        </Avatar>
        <Typography variant="base-regular">{message.content}</Typography>
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
        <Typography variant="base-regular">{message.content}</Typography>
      </div>
    </div>
  )
}
