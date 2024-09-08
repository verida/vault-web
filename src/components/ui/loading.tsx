import React from "react"

import { Spinner } from "@/components/spinner"
import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

export type LoadingBlockProps = React.ComponentProps<"div">

export function LoadingBlock(props: LoadingBlockProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn("flex flex-col items-center gap-4 text-center", className)}
      {...divProps}
    />
  )
}
LoadingBlock.displayName = "LoadingBlock"

export function LoadingBlockSpinner() {
  return <Spinner />
}
LoadingBlockSpinner.displayName = "LoadingBlockSpinner"

export type LoadingBlockTitleProps = React.ComponentProps<typeof Typography>

export function LoadingBlockTitle(props: LoadingBlockTitleProps) {
  const { variant = "heading-4", ...typographyProps } = props

  return <Typography variant={variant} component="p" {...typographyProps} />
}
LoadingBlockTitle.displayName = "LoadingBlockTitle"

export type LoadingBlockDescriptionProps = React.ComponentProps<
  typeof Typography
>

export function LoadingBlockDescription(props: LoadingBlockDescriptionProps) {
  const { variant = "base-regular", ...typographyProps } = props

  return (
    <p className="text-muted-foreground">
      <Typography variant={variant} {...typographyProps} />
    </p>
  )
}
LoadingBlockDescription.displayName = "LoadingBlockDescription"
