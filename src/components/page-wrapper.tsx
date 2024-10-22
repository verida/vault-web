import Link from "next/link"

import { ArrowLeft } from "@/components/icons/arrow-left"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

export type PageWrapperProps = {
  pageTitle?: string | React.ReactNode
  leftContent?: React.ReactNode
  backNavigationHref?: string
  backNavigationLabel?: string
  children: React.ReactNode
  contentClassName?: React.ComponentProps<"div">["className"]
} & React.ComponentProps<"div">

export function PageWrapper(props: PageWrapperProps) {
  const {
    pageTitle,
    leftContent,
    backNavigationHref,
    backNavigationLabel,
    children,
    className,
    contentClassName,
    ...divProps
  } = props

  return (
    <div
      className={cn("flex min-h-full flex-1 flex-col gap-6", className)}
      {...divProps}
    >
      <div className="flex flex-col gap-9">
        {backNavigationHref ? (
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
            {backNavigationLabel ? (
              <Typography variant="heading-5" component="span">
                {backNavigationLabel}
              </Typography>
            ) : null}
          </div>
        ) : null}
        {pageTitle || leftContent ? (
          <div className="flex min-h-12 flex-row items-center justify-between gap-6">
            {typeof pageTitle === "string" ? (
              <PageTitle>{pageTitle}</PageTitle>
            ) : (
              pageTitle
            )}
            {leftContent}
          </div>
        ) : null}
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col pb-4 md:pb-6 xl:pb-8",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
PageWrapper.displayName = "PageWrapper"

export type PageTitleProps = React.ComponentProps<typeof Typography>

export function PageTitle(props: PageTitleProps) {
  const { ...typographyProps } = props

  return <Typography variant="heading-3" {...typographyProps} />
}
PageTitle.displayName = "PageTitle"
