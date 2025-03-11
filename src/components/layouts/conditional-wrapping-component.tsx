import { ComponentType, ReactNode } from "react"

export interface ConditionalWrappingComponentProps {
  condition: boolean
  Component: ComponentType<{ children: ReactNode }>
  children: ReactNode
}

export function ConditionalWrappingComponent(
  props: ConditionalWrappingComponentProps
) {
  const { condition, Component, children } = props

  if (!condition) {
    return <>{children}</>
  }

  return <Component>{children}</Component>
}
ConditionalWrappingComponent.displayName = "ConditionalWrappingComponent"
