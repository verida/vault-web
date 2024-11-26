import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

export type SummarySectionWrapperProps = {
  title: string
} & React.ComponentProps<"section">

export function SummarySectionWrapper(props: SummarySectionWrapperProps) {
  const { title, children, className, ...sectionProps } = props

  return (
    <section
      className={cn("flex flex-col gap-4 sm:gap-6", className)}
      {...sectionProps}
    >
      <Typography variant="heading-4">{title}</Typography>
      {children}
    </section>
  )
}
SummarySectionWrapper.displayName = "SummarySectionWrapper"
