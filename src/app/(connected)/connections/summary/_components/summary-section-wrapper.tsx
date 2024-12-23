import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

export type SummarySectionWrapperProps = {
  sectionTitle: string | React.ReactNode
} & React.ComponentProps<"section">

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
