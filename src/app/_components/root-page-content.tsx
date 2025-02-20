import React from "react"

import { RootPageFooter } from "@/app/_components/root-page-footer"
import { RootPageHeader } from "@/app/_components/root-page-header"
import { Typography } from "@/components/typography"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { OnboardingButton } from "@/features/onboarding/components/onboarding-button"
import { cn } from "@/styles/utils"

export interface RootPageContentProps
  extends Omit<React.ComponentProps<"div">, "children"> {}

export function RootPageContent(props: RootPageContentProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex h-full min-h-fit flex-col gap-8 bg-surface px-4 py-6",
        className
      )}
      {...divProps}
    >
      <RootPageHeader />
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
            <OnboardingButton />
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
      <RootPageFooter />
    </div>
  )
}
RootPageContent.displayName = "RootPageContent"
