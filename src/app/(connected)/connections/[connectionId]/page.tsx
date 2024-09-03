import { notFound } from "next/navigation"

import { ConnectionDetails } from "@/app/(connected)/connections/[connectionId]/_components/connection-details"
import { MOCK_USER_CONNECTIONS } from "@/features/connections"

type ConnectionPageProps = {
  params: { connectionId: string }
}

export default function ConnectionPage(props: ConnectionPageProps) {
  const { params } = props
  const { connectionId: encodedConnectionId } = params
  const connectionId = decodeURIComponent(encodedConnectionId)
  const connection = MOCK_USER_CONNECTIONS.find((c) => c.name === connectionId)

  if (!connection) {
    notFound()
  }

  return <ConnectionDetails connection={connection} />
}
