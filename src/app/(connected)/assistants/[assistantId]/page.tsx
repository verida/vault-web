"use client"

import { MessageSquareMoreIcon } from "lucide-react"
import { notFound } from "next/navigation"
import { useMemo } from "react"
import { useMediaQuery } from "usehooks-ts"

import { AssistantDataStatus } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-data-status"
import { AssistantOutput } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-output"
import { AssistantPromptsSelector } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-prompts-selector"
import { AssistantUserInput } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-user-input"
import AssistantLoadingPage from "@/app/(connected)/assistants/[assistantId]/loading"
import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"
import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"
import { getMediaQuery } from "@/styles/utils"

type AssistantPageProps = {
  params: {
    assistantId: string
  }
}

export default function AssistantPage(props: AssistantPageProps) {
  const {
    params: { assistantId: encodedAssistantId },
  } = props
  const assistantId = decodeURIComponent(encodedAssistantId)

  const { aiAssistants, isLoading } = useGetAiAssistants()

  const currentAssistant = useMemo(() => {
    return (aiAssistants?.find(
      (aiAssistant) => aiAssistant._id === assistantId
    ) ?? assistantId === DEFAULT_ASSISTANT._id)
      ? DEFAULT_ASSISTANT
      : null
  }, [aiAssistants, assistantId])

  const isXL = useMediaQuery(getMediaQuery("xl"))

  if (currentAssistant) {
    return (
      <div className="flex h-full w-full flex-row justify-center gap-6">
        {isXL ? (
          <aside className="pb-4 md:pb-6 xl:pb-8">
            <Card className="flex w-[26.5rem] flex-col gap-3 rounded-xl p-3">
              <div className="flex flex-row items-center gap-2 px-1 pt-1 text-muted-foreground">
                <MessageSquareMoreIcon className="size-5 sm:size-6" />
                <Typography variant="base-semibold">Your prompts</Typography>
              </div>
              <AssistantPromptsSelector />
            </Card>
          </aside>
        ) : null}
        <div className="flex h-full w-full max-w-screen-md flex-1 flex-col xl:max-w-none">
          <AssistantUserInput className="z-10 -mb-5" />
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-1 flex-col gap-4 pb-4 pt-9 md:pb-6 xl:pb-8">
              <AssistantDataStatus className="pl-3 md:pl-4" />
              <AssistantOutput />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <AssistantLoadingPage />
  }

  notFound()
}
AssistantPage.displayName = "AssistantPage"
