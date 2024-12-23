import Link from "next/link"

import { LockIcon } from "@/components/icons/lock"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { ACCESS_REQUEST_FORM_URL } from "@/features/restricted-access/constants"
import { cn } from "@/styles/utils"

export type RestrictedAccessPageContentProps = {
  isLoading: boolean
  isError: boolean
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">

export function RestrictedAccessPageContent(
  props: RestrictedAccessPageContentProps
) {
  const { isLoading, isError, className, ...divProps } = props

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
      ) : isError ? (
        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockTitle variant="heading-1">
            Something went wrong!
          </ErrorBlockTitle>
          <ErrorBlockDescription variant="base-l">
            The application currently experiences an error. Please check again
            later.
          </ErrorBlockDescription>
        </ErrorBlock>
      ) : (
        <ErrorBlock>
          <LockIcon className="text-accent" />
          <ErrorBlockTitle variant="heading-1">Limited Access</ErrorBlockTitle>
          <ErrorBlockDescription variant="base-l">
            You currently have limited access to the Verida Vault
          </ErrorBlockDescription>
          <Button asChild>
            <Link
              href={ACCESS_REQUEST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request Access
            </Link>
          </Button>
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
