"use client"

import { VeridaNetworkLogo } from "@/components/icons/verida-network-logo"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { cn } from "@/styles/utils"

export type AssistantOutputRendererProps = React.ComponentProps<"div">

export function AssistantOutputRenderer(props: AssistantOutputRendererProps) {
  const { className, ...divProps } = props

  const { assistantOutput, isProcessing } = useAssistants()

  return (
    <div className={cn("", className)} {...divProps}>
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
          {isProcessing || !assistantOutput ? (
            <AssistantOutputSkeleton className="w-full" />
          ) : (
            <MarkdownRenderer>{assistantOutput.result}</MarkdownRenderer>
          )}
        </div>
      </div>
    </div>
  )
}
AssistantOutputRenderer.displayName = "AssistantOutputRenderer"

type AssistantOutputSkeletonProps = Omit<
  React.ComponentProps<"div">,
  "children"
>

function AssistantOutputSkeleton(props: AssistantOutputSkeletonProps) {
  const { className, ...divProps } = props

  return (
    <div className={cn("flex flex-col", className)} {...divProps}>
      <div className="flex flex-row gap-2">
        <Skeleton className="my-[0.3125rem] h-3.5 w-1/12 rounded-full" />
        <Skeleton className="my-[0.3125rem] h-3.5 w-9/12 rounded-full" />
        <Skeleton className="my-[0.3125rem] h-3.5 flex-1 rounded-full" />
      </div>
      <div className="flex flex-row gap-2">
        <Skeleton className="my-[0.3125rem] h-3.5 w-7/12 rounded-full" />
      </div>
    </div>
  )
}
AssistantOutputSkeleton.displayName = "AssistantOutputSkeleton"
