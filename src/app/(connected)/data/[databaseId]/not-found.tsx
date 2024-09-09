import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  NotFoundBlock,
  NotFoundBlockDescription,
  NotFoundBlockImage,
  NotFoundBlockTitle,
} from "@/components/ui/not-found"
import { getDataPageRoute } from "@/features/routes/utils"

export default function DatabaseNotFoundPage() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
      <NotFoundBlock>
        <NotFoundBlockImage />
        <NotFoundBlockTitle>Data Not Found</NotFoundBlockTitle>
        <NotFoundBlockDescription>
          The data type you are looking for does not exist.
        </NotFoundBlockDescription>
        <Button asChild variant="outline">
          <Link href={getDataPageRoute()}>Go back to Data page</Link>
        </Button>
      </NotFoundBlock>
    </div>
  )
}
DatabaseNotFoundPage.displayName = "DatabaseNotFoundPage"
