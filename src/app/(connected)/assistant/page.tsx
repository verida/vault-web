import { AssistantDataStatus } from "@/app/(connected)/assistant/_components/assistant-data-status"
import { AssistantOutput } from "@/app/(connected)/assistant/_components/assistant-output"
import { AssistantUserInput } from "@/app/(connected)/assistant/_components/assistant-user-input"
import { AssistantUserInputSelector } from "@/app/(connected)/assistant/_components/assistant-user-input-selector"
import { Card } from "@/components/ui/card"

export default function AssistantsPage() {
  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="hidden max-w-screen-sm flex-1 pb-4 md:pb-6 xl:block xl:pb-8">
        <Card className="w-full p-3">
          <AssistantUserInputSelector />
        </Card>
      </div>
      <div className="flex h-full w-full flex-col">
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
