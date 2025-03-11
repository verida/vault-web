import { ComponentProps, ReactNode } from "react"

import { Typography } from "@/components/ui/typography"
import { cn } from "@/styles/utils"

export interface SummarySectionWrapperProps extends ComponentProps<"section"> {
  sectionTitle: string | ReactNode
}

export function SummarySectionWrapper(props: SummarySectionWrapperProps) {
  const { sectionTitle, children, className, ...sectionProps } = props

  return (
    <section
      className={cn("flex flex-col gap-4 sm:gap-6", className)}
      {...sectionProps}
    >
      {typeof sectionTitle === "string" ? (
        <Typography variant="heading-4">{sectionTitle}</Typography>
      ) : (
        sectionTitle
      )}
      {children}
    </section>
  )
}
SummarySectionWrapper.displayName = "SummarySectionWrapper"
