"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/layouts/error-page-content"
import { getConnectionsSummaryPageRoute } from "@/features/routes/utils"

export default function ConnectionsLogsErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error getting the data connections logs"
      error={error}
      reset={reset}
      navigationButtonHref={getConnectionsSummaryPageRoute()}
      navigationButtonLabel="Go to connections page"
    />
  )
}
ConnectionsLogsErrorPage.displayName = "ConnectionsLogsErrorPage"
