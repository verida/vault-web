import Link from "next/link"
import React from "react"

import { LandingPageFooter } from "@/app/_components/landing-page-footer"
import { LandingPageHeader } from "@/app/_components/landing-page-header"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { cn } from "@/styles/utils"

export interface LandingPageContentProps
  extends Omit<React.ComponentProps<"div">, "children"> {}

export function LandingPageContent(props: LandingPageContentProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex h-full min-h-fit flex-col gap-8 bg-surface px-4 py-6",
        className
      )}
      {...divProps}
    >
      <LandingPageHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-2 text-center">
          <Typography variant="heading-1">
            Take control of your personal data
          </Typography>
          <Typography variant="base-l">
            Securely manage your personal data with the Verida Vault.
          </Typography>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Typography
              variant="heading-5"
              component="p"
              className="text-center"
            >
              New to Verida?
            </Typography>
            <Button asChild>
              <Link href="/onboarding">Get Started</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Typography
              variant="heading-5"
              component="p"
              className="text-center"
            >
              Already have a Verida Identity?
            </Typography>
            <VeridaConnectButton
              variant="outline"
              label="Connect with Verida Wallet"
            />
          </div>
        </div>
      </div>
      <LandingPageFooter />
    </div>
  )
}
LandingPageContent.displayName = "LandingPageContent"
