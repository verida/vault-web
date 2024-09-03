type ConnectionsLayoutProps = {
  children: React.ReactNode
}

export default function ConnectionsLayout(props: ConnectionsLayoutProps) {
  const { children } = props

  return <div>{children}</div>
}
ConnectionsLayout.displayName = "ConnectionsLayout"
