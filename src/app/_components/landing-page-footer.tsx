import { Typography } from "@/components/typography"
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
          href="https://verida.network"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <Typography variant="base-s-regular">
            &copy; {currentDate.getFullYear()} Verida Network
          </Typography>
        </a>
        <a
          // TODO: Update T&C link if needed
          href="https://www.verida.io/terms-and-conditions"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <Typography variant="base-s-regular">Terms & Conditions</Typography>
        </a>
      </div>
    </footer>
  )
}
