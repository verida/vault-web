"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { useOnboardingEntryQueryState } from "@/features/onboarding/hooks/use-onboarding-entry-query-state"
import { getOnboardingPageRoute } from "@/features/routes/utils"

export interface OnboardingButtonProps extends ComponentProps<typeof Button> {
  entryPath?: string
}

export function OnboardingButton(props: OnboardingButtonProps) {
  const {
    entryPath,
    children = "Get Started",
    variant = "primary",
    ...buttonProps
  } = props

  const pathName = usePathname()
  const searchParams = useSearchParams()

  const { serializeOnboardingEntryPath } = useOnboardingEntryQueryState()

  const onboardingUrl = serializeOnboardingEntryPath(
    `${getOnboardingPageRoute()}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
    {
      onboardingEntryPath: entryPath || pathName,
    }
  )

  return (
    <Button variant={variant} {...buttonProps} asChild>
      <Link href={onboardingUrl}>{children}</Link>
    </Button>
  )
}
