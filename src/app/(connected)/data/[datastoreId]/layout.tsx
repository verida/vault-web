import { SubPageWrapper } from "@/components/sub-page-wrapper"

type DatastoreLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function DatastoreLayout(props: DatastoreLayoutProps) {
  const { children, item } = props

  return (
    <SubPageWrapper
      backNavigationHref="/data"
      backNavigationLabel="Back to all Data"
    >
      {children}
      {item}
    </SubPageWrapper>
  )
}
DatastoreLayout.displayName = "DatastoreLayout"
