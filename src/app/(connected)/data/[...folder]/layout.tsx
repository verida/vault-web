type DataItemLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function DatastoreLayout(props: DataItemLayoutProps) {
  const { children, item } = props

  return (
    <>
      {children}
      {item}
    </>
  )
}
DatastoreLayout.displayName = "DatastoreLayout"
