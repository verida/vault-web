import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  NotFoundBlock,
  NotFoundBlockDescription,
  NotFoundBlockImage,
  NotFoundBlockTitle,
} from "@/components/ui/not-found"
import { getConnectionsSummaryPageRoute } from "@/features/routes/utils"

export default function ConnectionNotFoundPage() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
      <NotFoundBlock>
        <NotFoundBlockImage />
        <NotFoundBlockTitle>Connection Not Found</NotFoundBlockTitle>
        <NotFoundBlockDescription>
          The connection you are looking for does not exist.
        </NotFoundBlockDescription>
        <Button asChild variant="outline">
          <Link href={getConnectionsSummaryPageRoute()}>
            Go back to Connections page
          </Link>
        </Button>
      </NotFoundBlock>
    </div>
  )
}
ConnectionNotFoundPage.displayName = "ConnectionNotFoundPage"
