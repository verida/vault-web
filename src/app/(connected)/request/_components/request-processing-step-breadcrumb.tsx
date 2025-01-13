import { ComponentProps, Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/styles/utils"

interface RequestProcessingStepBreadcrumbProps
  extends ComponentProps<typeof Breadcrumb> {
  steps: {
    name: string
    current: boolean
  }[]
}

export function RequestProcessingStepBreadcrumb(
  props: RequestProcessingStepBreadcrumbProps
) {
  const { steps, ...breadcrumbProps } = props

  return (
    <Breadcrumb {...breadcrumbProps}>
      <BreadcrumbList>
        {steps.map((step, index) => (
          <Fragment key={step.name}>
            <BreadcrumbItem>
              <BreadcrumbPage
                className={cn(step.current ? "" : "text-muted-foreground")}
              >
                {step.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
            {index < steps.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
RequestProcessingStepBreadcrumb.displayName = "RequestProcessingStepBreadcrumb"
