import React from "react"

import { Spinner } from "@/components/spinner"
import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

export type LoadingProps = React.ComponentProps<"div">

export function Loading(props: LoadingProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn("flex flex-col items-center gap-4 text-center", className)}
      {...divProps}
    />
  )
}
Loading.displayName = "Loading"

export function LoadingSpinner() {
  return <Spinner />
}
LoadingSpinner.displayName = "LoadingSpinner"
export type LoadingTitleProps = React.ComponentProps<typeof Typography>

export function LoadingTitle(props: LoadingTitleProps) {
  const { variant = "heading-4", ...typographyProps } = props

  return <Typography variant={variant} component="p" {...typographyProps} />
}
LoadingTitle.displayName = "LoadingTitle"

export type LoadingDescriptionProps = React.ComponentProps<typeof Typography>

export function LoadingDescription(props: LoadingDescriptionProps) {
  const { variant = "base-regular", ...typographyProps } = props

  return (
    <p className="text-muted-foreground">
      <Typography variant={variant} {...typographyProps} />
    </p>
  )
}
LoadingDescription.displayName = "LoadingDescription"
