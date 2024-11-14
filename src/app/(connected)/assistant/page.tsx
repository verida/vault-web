"use client"

import { MessageSquareMoreIcon } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"

import { AssistantDataStatus } from "@/app/(connected)/assistant/_components/assistant-data-status"
import { AssistantOutput } from "@/app/(connected)/assistant/_components/assistant-output"
import { AssistantUserInput } from "@/app/(connected)/assistant/_components/assistant-user-input"
import { AssistantUserInputSelector } from "@/app/(connected)/assistant/_components/assistant-user-input-selector"
import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"
import { getMediaQuery } from "@/styles/utils"

export default function AssistantsPage() {
  const isXL = useMediaQuery(getMediaQuery("xl"))

  return (
    <div className="flex h-full w-full flex-row justify-center gap-6">
      {isXL ? (
        <aside className="pb-4 md:pb-6 xl:pb-8">
          <Card className="flex w-[26.5rem] flex-col gap-3 rounded-xl p-3">
            <div className="flex flex-row items-center gap-2 px-1 pt-1 text-muted-foreground">
              <MessageSquareMoreIcon className="size-5 sm:size-6" />
              <Typography variant="base-semibold">Your prompts</Typography>
            </div>
            <AssistantUserInputSelector />
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
AssistantsPage.displayName = "AssistantsPage"
