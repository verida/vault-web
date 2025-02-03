import { Typography } from "@/components/typography"
import { TERMS_AND_CONDITIONS_URL, VERIDA_WEBSITE_URL } from "@/constants/app"
import { cn } from "@/styles/utils"

export type LandingPageFooterProps = Omit<
  React.ComponentProps<"footer">,
  "children"
>

export function LandingPageFooter(props: LandingPageFooterProps) {
  const { className, ...footerProps } = props

  const currentDate = new Date()

  return (
    <footer {...footerProps} className={cn("py-4 md:py-6", className)}>
      <div className="flex flex-row items-center justify-between gap-4 text-muted-foreground">
        <a
          href={VERIDA_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:underline md:no-underline"
        >
          <Typography variant="base-s-regular">
            &copy; {currentDate.getFullYear()} Verida Network
          </Typography>
        </a>
        <a
          href={TERMS_AND_CONDITIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:underline md:no-underline"
        >
          <Typography variant="base-s-regular">Terms & Conditions</Typography>
        </a>
      </div>
    </footer>
  )
}
LandingPageFooter.displayName = "LandingPageFooter"
