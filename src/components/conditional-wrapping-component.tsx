export interface ConditionalWrappingComponentProps {
  condition: boolean
  Component: React.ComponentType<{ children: React.ReactNode }>
  children: React.ReactNode
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
