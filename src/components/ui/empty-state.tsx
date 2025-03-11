import Image from "next/image"
import { ComponentProps } from "react"

import EmptyIllustration from "@/assets/empty-illustration.svg"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/styles/utils"

export type EmptyStateProps = ComponentProps<"div">

export function EmptyState(props: EmptyStateProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn("flex flex-col items-center gap-4 text-center", className)}
      {...divProps}
    />
  )
}
EmptyState.displayName = "EmptyState"

export function EmptyStateImage() {
  return (
    <Image
      src={EmptyIllustration}
      width={114}
      height={152}
      alt=""
      className="h-[114px] md:h-[152px]"
    />
  )
}
EmptyStateImage.displayName = "EmptyStateImage"

export type EmptyStateTitleProps = ComponentProps<typeof Typography>

export function EmptyStateTitle(props: EmptyStateTitleProps) {
  const { variant = "heading-4", ...typographyProps } = props

  return <Typography variant={variant} component="p" {...typographyProps} />
}
EmptyStateTitle.displayName = "EmptyStateTitle"

export type EmptyStateDescriptionProps = ComponentProps<typeof Typography>

export function EmptyStateDescription(props: EmptyStateDescriptionProps) {
  const { variant = "base-regular", ...typographyProps } = props

  return (
    <div className="text-muted-foreground">
      <Typography variant={variant} {...typographyProps} />
    </div>
  )
}
EmptyStateDescription.displayName = "EmptyStateDescription"
