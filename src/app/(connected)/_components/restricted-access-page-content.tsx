import Link from "next/link"

import { LockIcon } from "@/components/icons/lock"
import { Typography } from "@/components/typography"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { cn } from "@/styles/utils"

export type RestrictedAccessPageContentProps = {
  isLoading: boolean
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">

export function RestrictedAccessPageContent(
  props: RestrictedAccessPageContentProps
) {
  const { isLoading, className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-8",
        className
      )}
      {...divProps}
    >
      {isLoading ? (
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle variant="heading-1">
            Checking your access...
          </LoadingBlockTitle>
          <LoadingBlockDescription variant="base-l">
            The Vault app is currently in limited access, please wait while we
            are checking your access to the application.
          </LoadingBlockDescription>
        </LoadingBlock>
      ) : (
        <ErrorBlock>
          <LockIcon className="text-accent" />
          <ErrorBlockTitle variant="heading-1">Limited Access</ErrorBlockTitle>
          <ErrorBlockDescription variant="base-l">
            {`Your account currently has limited access. We've added your DID to the waitlist, and you'll be notified once access is granted.`}
          </ErrorBlockDescription>
          <Typography variant="base-semibold">
            <span className="text-accent">
              For more details and updates visit{" "}
              <Link
                href="https://verida.ai"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verida.ai
              </Link>
            </span>
          </Typography>
        </ErrorBlock>
      )}
    </div>
  )
}
