import { SubPageWrapper } from "@/components/sub-page-wrapper"
import { getConnectionsSummaryPageRoute } from "@/features/routes/utils"

type ConnectionLayoutProps = {
  children: React.ReactNode
}

export default function ConnectionLayout(props: ConnectionLayoutProps) {
  const { children } = props

  return (
    <SubPageWrapper
      backNavigationHref={getConnectionsSummaryPageRoute()}
      backNavigationLabel="Back to all Connections"
    >
      {children}
    </SubPageWrapper>
  )
}
