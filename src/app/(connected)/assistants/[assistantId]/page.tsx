"use client"

import { MessageSquareMoreIcon } from "lucide-react"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

import { AiPromptSelector } from "@/app/(connected)/assistants/[assistantId]/_components/ai-prompt-selector"
import { AssistantDataStatus } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-data-status"
import { AssistantOutput } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-output"
import { AssistantSecurityDetailsDialog } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-security-details-dialog"
import { AssistantUserInput } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-user-input"
import AssistantLoadingPage from "@/app/(connected)/assistants/[assistantId]/loading"
import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"
import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useGetAiAssistant } from "@/features/assistants/hooks/use-get-ai-assistant"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"
import { getAssistantPageRoute } from "@/features/routes/utils"
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
  const searchParams = useSearchParams()
  const fromDeletion = searchParams.get("fromDeletion") === "true"

  const router = useRouter()

  const { setSelectedAiAssistant, hotload } = useAssistants()

  useEffect(() => {
    setSelectedAiAssistant(assistantId)
  }, [assistantId, setSelectedAiAssistant])

  const { aiAssistant, isLoading: isLoadingAiAssistant } = useGetAiAssistant(
    {
      assistantId,
    },
    {
      enabled: assistantId !== DEFAULT_ASSISTANT._id,
    }
  )

  const { aiAssistants, isLoading: isLoadingAiAssistants } =
    useGetAiAssistants()

  useEffect(() => {
    if (
      !fromDeletion && // Only redirect if not from deletion
      aiAssistants &&
      aiAssistants.length > 0 &&
      assistantId === DEFAULT_ASSISTANT._id
    ) {
      const firstAssistantId = aiAssistants[0]._id
      router.replace(getAssistantPageRoute({ assistantId: firstAssistantId }))
    }
  }, [aiAssistants, assistantId, router, fromDeletion])

  const isXL = useMediaQuery(getMediaQuery("xl"))

  if (
    isLoadingAiAssistant ||
    isLoadingAiAssistants ||
    hotload.status === "loading"
  ) {
    return <AssistantLoadingPage hotload={hotload} />
  }

  // TODO: Display alert if hotloading failed

  if (aiAssistant || assistantId === DEFAULT_ASSISTANT._id) {
    return (
      <div className="flex h-full w-full flex-row justify-center gap-6">
        {isXL ? (
          <aside>
            <Card className="flex w-[26.5rem] flex-col gap-3 rounded-xl p-3">
              <div className="flex flex-row items-center gap-2 px-1 pt-1 text-muted-foreground">
                <MessageSquareMoreIcon className="size-5 sm:size-6" />
                <Typography variant="base-semibold">
                  Your prompts{aiAssistant ? ` for ${aiAssistant.name}` : ""}
                </Typography>
              </div>
              <AiPromptSelector />
            </Card>
          </aside>
        ) : null}
        <div className="flex h-full w-full max-w-screen-md flex-1 flex-col gap-4 xl:max-w-none">
          <div className="sticky top-2 z-10 sm:top-3 md:top-6">
            <AssistantUserInput />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-row items-center justify-between gap-4 px-3 md:px-4">
              <AssistantDataStatus />
              <AssistantSecurityDetailsDialog />
            </div>
            <AssistantOutput />
          </div>
        </div>
      </div>
    )
  }

  notFound()
}
AssistantPage.displayName = "AssistantPage"
