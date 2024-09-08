import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  NotFound,
  NotFoundDescription,
  NotFoundImage,
  NotFoundTitle,
} from "@/components/ui/not-found"
import { getRootPageRoute } from "@/features/routes/utils"

export default function AppNotFoundPage() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
      <NotFound>
        <NotFoundImage />
        <NotFoundTitle>Page Not Found</NotFoundTitle>
        <NotFoundDescription>
          The page you are looking for does not exist.
        </NotFoundDescription>
        <Button asChild variant="outline">
          <Link href={getRootPageRoute()}>Go back to the Home page</Link>
        </Button>
      </NotFound>
    </div>
  )
}
AppNotFoundPage.displayName = "AppNotFoundPage"
