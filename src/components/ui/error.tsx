import Image from "next/image"
import { type ComponentProps } from "react"

import ErrorIllustration from "@/assets/error-illustration.svg"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/styles/utils"

export interface ErrorBlockProps extends ComponentProps<"div"> {}

export function ErrorBlock(props: ErrorBlockProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn("flex flex-col items-center gap-4 text-center", className)}
      {...divProps}
    />
  )
}
ErrorBlock.displayName = "ErrorBlock"

export function ErrorBlockImage() {
  return (
    <Image
      src={ErrorIllustration}
      width={121}
      height={140}
      alt=""
      className="h-[105px] md:h-[140px]"
    />
  )
}
ErrorBlockImage.displayName = "ErrorBlockImage"

export interface ErrorBlockTitleProps
  extends ComponentProps<typeof Typography> {}

export function ErrorBlockTitle(props: ErrorBlockTitleProps) {
  const { variant = "heading-4", ...typographyProps } = props

  return <Typography variant={variant} component="p" {...typographyProps} />
}
ErrorBlockTitle.displayName = "ErrorBlockTitle"

export interface ErrorBlockDescriptionProps
  extends ComponentProps<typeof Typography> {}

export function ErrorBlockDescription(props: ErrorBlockDescriptionProps) {
  const { variant = "base-regular", ...typographyProps } = props

  return (
    <div className="text-muted-foreground">
      <Typography variant={variant} {...typographyProps} />
    </div>
  )
}
ErrorBlockDescription.displayName = "ErrorBlockDescription"
