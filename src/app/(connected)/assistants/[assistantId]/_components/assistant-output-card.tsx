"use client"

import { intlFormat } from "date-fns"
import { ComponentProps, useMemo } from "react"

import { AssistantOutputCardMenu } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-output-card-menu"
import { MoreIcon } from "@/components/icons/more-icon"
import { VeridaNetworkLogo } from "@/components/icons/verida-network-logo"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { cn } from "@/styles/utils"
import { SHORT_TIME_FORMAT_OPTIONS } from "@/utils/date"

export type AssistantOutputCardProps = Omit<ComponentProps<"div">, "children">

export function AssistantOutputCard(props: AssistantOutputCardProps) {
  const { className, ...divProps } = props

  const { aiAssistantOutput } = useAssistants()

  const { aiAssistants } = useGetAiAssistants()

  const outputAssistant = useMemo(() => {
    if (!aiAssistantOutput?.assistantId) {
      return undefined
    }

    const fromUserAssistants = aiAssistants?.find(
      (a) => a._id === aiAssistantOutput.assistantId
    )

    if (fromUserAssistants) {
      return fromUserAssistants
    }

    if (aiAssistantOutput.assistantId === DEFAULT_ASSISTANT._id) {
      return DEFAULT_ASSISTANT
    }

    return undefined
  }, [aiAssistantOutput?.assistantId, aiAssistants])

  const processedAt = useMemo(() => {
    if (aiAssistantOutput?.status !== "processed") {
      return EMPTY_VALUE_FALLBACK
    }

    return intlFormat(aiAssistantOutput.processedAt, SHORT_TIME_FORMAT_OPTIONS)
  }, [aiAssistantOutput])

  const processingTimeInfo = useMemo(() => {
    if (
      aiAssistantOutput?.status !== "processed" ||
      !aiAssistantOutput?.processingTime
    ) {
      return undefined
    }

    const milliseconds = aiAssistantOutput.processingTime
    const totalSeconds = milliseconds / 1000
    let minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60

    // If less than a second, show milliseconds
    if (minutes === 0 && remainingSeconds < 1) {
      return `${milliseconds}ms`
    }

    // If less than a minute or 60 seconds, show seconds rounded up
    const roundedSeconds = Math.round(remainingSeconds)
    if (minutes === 0 && roundedSeconds < 60) {
      return `${roundedSeconds}s`
    }

    // If more than a minute, show minutes rounded up based on seconds
    if (remainingSeconds >= 30) {
      minutes += 1
    }
    return `${minutes}min`
  }, [aiAssistantOutput])

  const dataInfo = useMemo(() => {
    if (
      aiAssistantOutput?.status !== "processed" ||
      !aiAssistantOutput?.databases ||
      aiAssistantOutput.databases.length === 0
    ) {
      return undefined
    }

    const databaseNames = aiAssistantOutput.databases.map((dbId) => {
      const dbDef = USER_DATABASE_DEFS.find((def) => def.searchType === dbId)
      return dbDef ? dbDef.titlePlural : dbId
    })

    if (databaseNames.length === 0) {
      return undefined
    }

    return databaseNames.join(", ")
  }, [aiAssistantOutput])

  const displayFooterInfo = useMemo(
    () =>
      (!!processingTimeInfo || !!dataInfo) &&
      !(!aiAssistantOutput || aiAssistantOutput?.status === "processing"),
    [processingTimeInfo, dataInfo, aiAssistantOutput]
  )

  return (
    <div className={className} {...divProps}>
      <Card className="gap-2 rounded-xl p-3 md:gap-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center justify-start gap-2">
            <Avatar className="relative size-8 shrink-0 p-1 text-white sm:size-10">
              <div
                className={cn(
                  "absolute inset-0 bg-ai-assistant-gradient",
                  !aiAssistantOutput ||
                    aiAssistantOutput?.status === "processing"
                    ? "animate-spin-slow"
                    : ""
                )}
              />
              <div className="absolute inset-0 flex flex-row items-center justify-center">
                <VeridaNetworkLogo className="size-5 sm:size-6" />
              </div>
            </Avatar>
            <div className="flex flex-col">
              <Typography variant="base-semibold">
                {outputAssistant ? outputAssistant.name : "Assistant"}
              </Typography>
              {!aiAssistantOutput ||
              aiAssistantOutput?.status === "processing" ? (
                <Skeleton className="my-[0.15rem] h-3 w-20 rounded-full" />
              ) : (
                <div className="text-muted-foreground">
                  <Typography variant="base-s-regular">
                    {processedAt}
                  </Typography>
                </div>
              )}
            </div>
          </div>
          {aiAssistantOutput?.status === "processed" ? (
            <div className="flex flex-row items-center justify-end gap-2">
              <AssistantOutputCardMenu>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 sm:size-10"
                >
                  <MoreIcon className="size-5 sm:size-6" />
                  <span className="sr-only">
                    Open assistant output actions menu
                  </span>
                </Button>
              </AssistantOutputCardMenu>
            </div>
          ) : null}
        </CardHeader>
        <CardBody>
          {!aiAssistantOutput || aiAssistantOutput?.status === "processing" ? (
            <AssistantOutputSkeleton className="w-full" />
          ) : (
            <MarkdownRenderer className="max-w-full overflow-x-auto">
              {aiAssistantOutput.result}
            </MarkdownRenderer>
          )}
        </CardBody>
        {displayFooterInfo ? (
          <CardFooter className="flex flex-row items-center justify-end text-end text-muted-foreground">
            <div className="flex flex-col gap-0">
              {processingTimeInfo ? (
                <Typography variant="base-s-regular">
                  {`Processed in ${processingTimeInfo}`}
                </Typography>
              ) : null}
              {dataInfo ? (
                <Typography variant="base-s-regular">
                  {`Used `}
                  <span className="lowercase">{dataInfo}</span>
                </Typography>
              ) : null}
            </div>
          </CardFooter>
        ) : null}
      </Card>
    </div>
  )
}
AssistantOutputCard.displayName = "AssistantOutputCard"

type AssistantOutputSkeletonProps = Omit<ComponentProps<"div">, "children">

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
        <Skeleton className="my-[0.3125rem] h-3.5 flex-1 rounded-full" />
      </div>
      <div className="flex flex-row gap-2">
        <Skeleton className="my-[0.3125rem] h-3.5 w-4/12 rounded-full" />
        <Skeleton className="my-[0.3125rem] h-3.5 flex-1 rounded-full" />
      </div>
      <div className="flex flex-row gap-2">
        <Skeleton className="my-[0.3125rem] h-3.5 w-7/12 rounded-full" />
      </div>
    </div>
  )
}
AssistantOutputSkeleton.displayName = "AssistantOutputSkeleton"
