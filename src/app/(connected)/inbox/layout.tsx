type InboxLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function InboxLayout(props: InboxLayoutProps) {
  const { children, item } = props

  return (
    <>
      {children}
      {item}
    </>
  )
}
InboxLayout.displayName = "InboxLayout"
