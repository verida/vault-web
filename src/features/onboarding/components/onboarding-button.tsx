"use client"

import Link from "next/link"
import { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { useRedirectPathQueryState } from "@/features/auth/hooks/use-redirect-path-query-state"
import { getOnboardingPageRoute } from "@/features/routes/utils"

export interface OnboardingButtonProps extends ComponentProps<typeof Button> {}

export function OnboardingButton(props: OnboardingButtonProps) {
  const {
    children = "Get Started",
    variant = "primary",
    ...buttonProps
  } = props

  const { redirectPath, serializeRedirectPath } = useRedirectPathQueryState()

  const onboardingUrl = serializeRedirectPath(getOnboardingPageRoute(), {
    redirectPath,
  })

  return (
    <Button variant={variant} {...buttonProps} asChild>
      <Link href={onboardingUrl}>{children}</Link>
    </Button>
  )
}
