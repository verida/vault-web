import Link from "next/link"
import React from "react"

import { LandingPageFeatureSlider } from "@/app/_components/landing-page-feature-slider"
import { LandingPageFooter } from "@/app/_components/landing-page-footer"
import { LandingPageHeader } from "@/app/_components/landing-page-header"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { cn } from "@/styles/utils"

export type LandingPageContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>

export function LandingPageContent(props: LandingPageContentProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex h-full flex-row justify-center bg-surface",
        className
      )}
      {...divProps}
    >
      <div className="flex h-full max-w-[2360px] flex-row">
        <div className="flex flex-col px-6 md:px-8 lg:w-1/2 lg:max-w-fit">
          <LandingPageHeader />
          <div className="flex flex-1 flex-col items-start justify-center gap-10 pb-5 pt-10">
            <div className="flex flex-col gap-4">
              <Typography variant="heading-1">
                Take control of your personal data
              </Typography>
              <Typography variant="base-l">
                Securely manage your personal data and zero knowledge
                credentials with the Verida Vault App.
              </Typography>
            </div>
            <div className="flex flex-col gap-4">
              <Typography variant="heading-5" component="p">
                New to Verida?{" "}
              </Typography>
              <Link href="/onboarding">
                <Button>Get Started</Button>
              </Link>
              <Typography variant="heading-5" component="p">
                Already have a Verida Identity?
              </Typography>
              <VeridaConnectButton
                variant="outline"
                label="Connect with Verida Wallet"
              />
            </div>
          </div>
          <LandingPageFooter />
        </div>
        <LandingPageFeatureSlider className="hidden flex-1 rounded-l-[32px] lg:flex" />
      </div>
    </div>
  )
}
LandingPageContent.displayName = "LandingPageContent"
