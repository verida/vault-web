"use client"

import { useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/styles/utils"

export type SpinnerProps = {
  spinnerClassName?: React.ComponentProps<"div">["className"]
} & React.ComponentProps<"div">

export function Spinner(props: SpinnerProps) {
  const { className, spinnerClassName, ...divProps } = props

  const svgRef = useRef<SVGSVGElement>(null)
  const [svgSize, setSvgSize] = useState(80)

  useLayoutEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect()
      setSvgSize(Math.max(width, height))
    }
  }, [spinnerClassName])

  return (
    <div className={cn("relative", className)} {...divProps}>
      <div
        className={cn(
          "size-20 animate-spin rounded-full bg-gradient-conic",
          spinnerClassName
        )}
        style={{
          mask: "url(#spinner-mask) no-repeat center",
          WebkitMask: "url(#spinner-mask) no-repeat center",
          WebkitMaskSize: "100%",
          maskSize: "100%",
        }}
      ></div>
      <svg
        ref={svgRef}
        width="0"
        height="0"
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className={cn("size-20", spinnerClassName, "absolute inset-0")}
      >
        <defs>
          <mask id="spinner-mask" x="0" y="0" width="1" height="1">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="50%" cy="50%" r="37.5%" fill="black" />
          </mask>
        </defs>
      </svg>
    </div>
  )
}
Spinner.displayName = "Spinner"
