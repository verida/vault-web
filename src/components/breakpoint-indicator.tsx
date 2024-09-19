import React from "react"

import { commonConfig } from "@/config/common"
import { cn } from "@/styles/utils"

export type BreakpointIndicatorProps = React.ComponentProps<"div">

export function BreakpointIndicator(props: BreakpointIndicatorProps) {
  const { className, ...divProps } = props

  if (!commonConfig.DEV_MODE) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-1 left-1 z-[100] flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 text-xs text-white",
        className
      )}
      {...divProps}
    >
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
BreakpointIndicator.displayName = "BreakpointIndicator"
