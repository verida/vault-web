import Link from "next/link"

import { ArrowLeft } from "@/components/icons/arrow-left"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"

export type SubPageWrapperProps = {
  backNavigationHref: string
  backNavigationLabel: string
  children: React.ReactNode
}

export function SubPageWrapper(props: SubPageWrapperProps) {
  const { backNavigationHref, backNavigationLabel, children } = props

  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-center gap-3">
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="-mx-2 -my-2 h-auto w-auto p-2"
        >
          <Link href={backNavigationHref}>
            <ArrowLeft />
          </Link>
        </Button>
        <Typography variant="heading-5" component="span">
          {backNavigationLabel}
        </Typography>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
