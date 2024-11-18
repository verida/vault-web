"use client"

import { intlFormat } from "date-fns"
import { useMemo } from "react"

import { AssistantOutputCardMenu } from "@/app/(connected)/assistant/_components/assistant-output-card-menu"
import { MoreIcon } from "@/components/icons/more-icon"
import { VeridaNetworkLogo } from "@/components/icons/verida-network-logo"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Typography } from "@/components/typography"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { cn } from "@/styles/utils"
import { SHORT_TIME_FORMAT_OPTIONS } from "@/utils/date"

export type AssistantOutputCardProps = React.ComponentProps<"div">

export function AssistantOutputCard(props: AssistantOutputCardProps) {
  const { className, ...divProps } = props

  const { assistantOutput, isProcessing } = useAssistants()

  const processedAt = useMemo(() => {
    if (!assistantOutput?.processedAt) {
      return "-"
    }

    return intlFormat(assistantOutput.processedAt, SHORT_TIME_FORMAT_OPTIONS)
  }, [assistantOutput?.processedAt])

  const processingTimeInfo = useMemo(() => {
    if (!assistantOutput?.processingTime) {
      return undefined
    }

    const totalSeconds = assistantOutput.processingTime
    let minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    const milliseconds = Math.floor((totalSeconds % 1) * 1000)

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
  }, [assistantOutput?.processingTime])

  const dataInfo = useMemo(() => {
    if (!assistantOutput?.databases || assistantOutput.databases.length === 0) {
      return undefined
    }

    const databaseNames = assistantOutput.databases.map((dbId) => {
      const dbDef = USER_DATABASE_DEFS.find((def) => def.searchType === dbId)
      return dbDef ? dbDef.titlePlural : dbId
    })

    if (databaseNames.length === 0) {
      return undefined
    }

    return databaseNames.join(", ")
  }, [assistantOutput?.databases])

  const displayFooterInfo = useMemo(
    () => (!!processingTimeInfo || !!dataInfo) && !isProcessing,
    [processingTimeInfo, dataInfo, isProcessing]
  )

  return (
    <div className={className} {...divProps}>
      <Card className="flex flex-col gap-2 rounded-xl p-3 md:gap-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between gap-2 p-0">
          <div className="flex flex-row items-center justify-start gap-2">
            <Avatar className="relative size-8 shrink-0 p-1 text-white sm:size-10">
              <div
                className={cn(
                  "absolute inset-0 bg-ai-assistant-gradient",
                  isProcessing ? "animate-spin-slow" : ""
                )}
              />
              <div className="absolute inset-0 flex flex-row items-center justify-center">
                <VeridaNetworkLogo className="size-5 sm:size-6" />
              </div>
            </Avatar>
            <div className="flex flex-col">
              <Typography variant="base-semibold">Assistant</Typography>
              {isProcessing ? (
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
          {assistantOutput ? (
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
        <CardContent className="p-0">
          {assistantOutput ? (
            <MarkdownRenderer className="max-w-full overflow-x-auto">
              {assistantOutput.result}
            </MarkdownRenderer>
          ) : isProcessing ? (
            <AssistantOutputSkeleton className="w-full" />
          ) : null}
        </CardContent>
        {displayFooterInfo ? (
          <CardFooter className="flex flex-row justify-end p-0 text-end text-muted-foreground">
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
