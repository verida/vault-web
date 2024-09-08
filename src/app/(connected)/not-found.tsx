import Image from "next/image"
import Link from "next/link"

import ErrorIllustration from "@/assets/error-illustration.svg"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { getRootPageRoute } from "@/features/routes/utils"

export default function AppNotFoundPage() {
  // TODO: Extract this component as a generic error component taking a title and description
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Image
          src={ErrorIllustration}
          width={121}
          height={140}
          alt="error"
          className="h-[105px] md:h-[140px]"
        />
        <Typography variant="heading-4" component="p">
          The page you are looking for does not exist
        </Typography>
        <Button variant="outline" asChild>
          <Link href={getRootPageRoute()}>Go back to the home page</Link>
        </Button>
      </div>
    </div>
  )
}
AppNotFoundPage.displayName = "AppNotFoundPage"
