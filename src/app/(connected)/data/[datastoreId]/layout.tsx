import { SubPageWrapper } from "@/components/sub-page-wrapper"
import { getDataPageRoute } from "@/features/routes/utils"

type DatastoreLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function DatastoreLayout(props: DatastoreLayoutProps) {
  const { children, item } = props

  return (
    <SubPageWrapper
      backNavigationHref={getDataPageRoute()}
      backNavigationLabel="Back to all Data"
    >
      {children}
      {item}
    </SubPageWrapper>
  )
}
DatastoreLayout.displayName = "DatastoreLayout"
