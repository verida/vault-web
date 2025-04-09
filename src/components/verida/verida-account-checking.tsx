import { type ComponentPropsWithoutRef } from "react"

import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { cn } from "@/styles/utils"

export interface VeridaAccountCheckingProps
  extends Omit<ComponentPropsWithoutRef<typeof LoadingBlock>, "children"> {}

export function VeridaAccountChecking(props: VeridaAccountCheckingProps) {
  const { className, ...loadingBlockProps } = props

  return (
    <LoadingBlock className={cn(className)} {...loadingBlockProps}>
      <LoadingBlockSpinner />
      <LoadingBlockTitle variant="heading-1">
        Checking your Verida account...
      </LoadingBlockTitle>
      <LoadingBlockDescription variant="base-l">
        Please wait while we check if your Verida account exists. This might
        take a moment.
      </LoadingBlockDescription>
    </LoadingBlock>
  )
}
VeridaAccountChecking.displayName = "VeridaAccountChecking"
