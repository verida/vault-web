import Image from "next/image"
import React from "react"

import ErrorIllustration from "@/assets/error-illustration.svg"
import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

export type NotFoundProps = React.ComponentProps<"div">

export function NotFound(props: NotFoundProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn("flex flex-col items-center gap-4 text-center", className)}
      {...divProps}
    />
  )
}
NotFound.displayName = "NotFound"

export function NotFoundImage() {
  return (
    <Image
      src={ErrorIllustration}
      width={121}
      height={140}
      alt="error"
      className="h-[105px] md:h-[140px]"
    />
  )
}
NotFoundImage.displayName = "NotFoundImage"

export type NotFoundTitleProps = React.ComponentProps<typeof Typography>

export function NotFoundTitle(props: NotFoundTitleProps) {
  const { variant = "heading-4", ...typographyProps } = props

  return <Typography variant={variant} component="p" {...typographyProps} />
}
NotFoundTitle.displayName = "NotFoundTitle"

export type NotFoundDescriptionProps = React.ComponentProps<typeof Typography>

export function NotFoundDescription(props: NotFoundDescriptionProps) {
  const { variant = "base-regular", ...typographyProps } = props

  return (
    <p className="text-muted-foreground">
      <Typography variant={variant} {...typographyProps} />
    </p>
  )
}
NotFoundDescription.displayName = "NotFoundDescription"
