import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  NotFound,
  NotFoundDescription,
  NotFoundImage,
  NotFoundTitle,
} from "@/components/ui/not-found"
import { getDataPageRoute } from "@/features/routes/utils"

export default function DatastoreNotFoundPage() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
      <NotFound>
        <NotFoundImage />
        <NotFoundTitle>Connection Not Found</NotFoundTitle>
        <NotFoundDescription>
          The connection you are looking for does not exist.
        </NotFoundDescription>
        <Button asChild variant="outline">
          <Link href={getDataPageRoute()}>Go back to Data page</Link>
        </Button>
      </NotFound>
    </div>
  )
}
DatastoreNotFoundPage.displayName = "DatastoreNotFoundPage"
