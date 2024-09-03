import { notFound } from "next/navigation"

import { DataConnectionDetails } from "@/app/(connected)/connections/[connectionId]/_components/data-connection-details"
import { MOCK_USER_DATA_CONNECTIONS } from "@/features/data-connections"

type ConnectionPageProps = {
  params: { connectionId: string }
}

export default function ConnectionPage(props: ConnectionPageProps) {
  const { params } = props
  const { connectionId: encodedConnectionId } = params
  const connectionId = decodeURIComponent(encodedConnectionId)
  const connection = MOCK_USER_DATA_CONNECTIONS.find(
    (c) => c.name === connectionId
  )

  if (!connection) {
    notFound()
  }

  return <DataConnectionDetails connection={connection} />
}
ConnectionPage.displayName = "ConnectionPage"
