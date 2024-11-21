type AssistantLayoutProps = {
  children: React.ReactNode
}

export default function AssistantLayout(props: AssistantLayoutProps) {
  const { children } = props

  return <>{children}</>
}
AssistantLayout.displayName = "AssistantLayout"
