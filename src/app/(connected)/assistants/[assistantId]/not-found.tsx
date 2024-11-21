import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  NotFoundBlock,
  NotFoundBlockDescription,
  NotFoundBlockImage,
  NotFoundBlockTitle,
} from "@/components/ui/not-found"
import { getAssistantsPageRoute } from "@/features/routes/utils"

export default function AssistantNotFoundPage() {
  // TODO: list the existing assistants in the page

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
      <NotFoundBlock>
        <NotFoundBlockImage />
        <NotFoundBlockTitle>Assistant Not Found</NotFoundBlockTitle>
        <NotFoundBlockDescription>
          The assistant you are looking for does not exist.
        </NotFoundBlockDescription>
        <Button asChild variant="outline">
          <Link href={getAssistantsPageRoute()}>
            Go back to Assistants page
          </Link>
        </Button>
      </NotFoundBlock>
    </div>
  )
}
AssistantNotFoundPage.displayName = "AssistantNotFoundPage"
