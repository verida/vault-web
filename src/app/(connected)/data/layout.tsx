type DataLayoutProps = {
  children: React.ReactNode
}

export default function DataLayout(props: DataLayoutProps) {
  const { children } = props

  return <>{children}</>
}
DataLayout.displayName = "DataLayout"
