import Link from "next/link"

import { Typography } from "@/components/typography"
import { TERMS_AND_CONDITIONS_URL, VERIDA_WEBSITE_URL } from "@/constants/app"

export interface LandingPageFooterProps
  extends Omit<React.ComponentProps<"footer">, "children"> {}

export function LandingPageFooter(props: LandingPageFooterProps) {
  const { className, ...footerProps } = props

  const currentDate = new Date()

  return (
    <footer {...footerProps} className={className}>
      <div className="flex flex-row items-center justify-between gap-4 text-muted-foreground">
        <Link
          href={VERIDA_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:underline md:no-underline"
        >
          <Typography variant="base-s-regular">
            &copy; {currentDate.getFullYear()} Verida Network
          </Typography>
        </Link>
        <Link
          href={TERMS_AND_CONDITIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:underline md:no-underline"
        >
          <Typography variant="base-s-regular">Terms & Conditions</Typography>
        </Link>
      </div>
    </footer>
  )
}
LandingPageFooter.displayName = "LandingPageFooter"
