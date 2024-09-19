import React from "react"

import { ConnectionButton } from "@/app/_components/connection-button"
import { LandingPageFeatureSlider } from "@/app/_components/landing-page-feature-slider"
import { LandingPageFooter } from "@/app/_components/landing-page-footer"
import { LandingPageHeader } from "@/app/_components/landing-page-header"
import { Typography } from "@/components/typography"
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
      <div className="flex h-full flex-row">
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
            <ConnectionButton />
            <LandingPageFeatureSlider className="h-full flex-1 rounded-t-[32px] lg:hidden" />
          </div>
          <LandingPageFooter />
        </div>
        <LandingPageFeatureSlider className="hidden max-w-screen-2xl flex-1 rounded-l-[32px] lg:flex 2xl:rounded-r-[32px]" />
      </div>
    </div>
  )
}
