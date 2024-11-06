"use client"

import { formatDuration, intlFormat } from "date-fns"
import { useMemo } from "react"

import { VeridaNetworkLogo } from "@/components/icons/verida-network-logo"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Typography } from "@/components/typography"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { Skeleton } from "@/components/ui/skeleton"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { DATABASE_DEFS } from "@/features/data/constants"
import { cn } from "@/styles/utils"
import { SHORT_TIME_FORMAT_OPTIONS } from "@/utils/date"

export type AssistantOutputRendererProps = React.ComponentProps<"div">

export function AssistantOutputRenderer(props: AssistantOutputRendererProps) {
  const { className, ...divProps } = props

  const { assistantOutput, isProcessing, error } = useAssistants()

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

    const milliseconds = assistantOutput.processingTime
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)

    const formattedValue = formatDuration(
      {
        minutes,
        seconds,
      },
      { format: ["minutes", "seconds"] }
    )

    return `Processed in ${formattedValue}`
  }, [assistantOutput?.processingTime])

  const dataInfo = useMemo(() => {
    if (!assistantOutput?.databases || assistantOutput.databases.length === 0) {
      return ""
    }

    const databaseNames = assistantOutput.databases.map((dbId) => {
      const dbDef = DATABASE_DEFS.find((def) => def.searchType === dbId)
      return dbDef ? dbDef.titlePlural : dbId
    })

    const formattedValue = databaseNames.join(", ")

    return `Used ${formattedValue}`
  }, [assistantOutput?.databases])

  const displayFooterInfo = useMemo(
    () => (!!processingTimeInfo || !!dataInfo) && !isProcessing,
    [processingTimeInfo, dataInfo, isProcessing]
  )

  return (
    <div className={cn(className)} {...divProps}>
      <Card className="flex flex-col gap-2 rounded-xl p-4">
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
        </CardHeader>
        <CardContent className="p-0">
          {assistantOutput ? (
            <MarkdownRenderer className="max-w-full overflow-x-auto">
              {assistantOutput.result}
            </MarkdownRenderer>
          ) : isProcessing ? (
            <AssistantOutputSkeleton className="w-full" />
          ) : (
            <ErrorBlock>
              <ErrorBlockImage />
              <ErrorBlockTitle>Error</ErrorBlockTitle>
              <ErrorBlockDescription>
                {error ??
                  "Something went wrong with the assistant. Please try again."}
              </ErrorBlockDescription>
            </ErrorBlock>
          )}
        </CardContent>
        {displayFooterInfo ? (
          <CardFooter className="flex flex-row justify-end p-0 text-end text-muted-foreground">
            <div className="flex flex-col gap-0">
              {processingTimeInfo ? (
                <Typography variant="base-s-regular">
                  {processingTimeInfo}
                </Typography>
              ) : null}
              {dataInfo ? (
                <Typography variant="base-s-regular" className="">
                  {dataInfo}
                </Typography>
              ) : null}
            </div>
          </CardFooter>
        ) : null}
      </Card>
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
