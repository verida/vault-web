import { AssistantDataStatus } from "@/app/(connected)/assistant/_components/assistant-data-status"
import { AssistantOutput } from "@/app/(connected)/assistant/_components/assistant-output"
import { AssistantUserInputField } from "@/app/(connected)/assistant/_components/assistant-user-input-field"

export default function AssistantsPage() {
  return (
    <div className="flex h-full flex-col">
      <AssistantUserInputField className="z-10 -mb-5" />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-1 flex-col gap-4 pb-4 pt-9 md:pb-6 xl:pb-8">
          <AssistantDataStatus className="px-1" />
          <AssistantOutput />
        </div>
      </div>
    </div>
  )
}
AssistantsPage.displayName = "AssistantsPage"
