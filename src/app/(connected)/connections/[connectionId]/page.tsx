"use client"

import { notFound } from "next/navigation"

import { DataConnectionDetails } from "@/app/(connected)/connections/[connectionId]/_components/data-connection-details"
import { useDataConnection } from "@/features/data-connections"

type ConnectionPageProps = {
  params: { connectionId: string }
}

export default function ConnectionPage(props: ConnectionPageProps) {
  const { params } = props
  const { connectionId: encodedConnectionId } = params
  const connectionId = decodeURIComponent(encodedConnectionId)

  const { connection, isLoading, isError } = useDataConnection(connectionId)

  if (connection) {
    return <DataConnectionDetails connection={connection} />
  }

  if (isLoading) {
    // TODO: Show a loading state
    return <div>Loading...</div>
  }

  if (isError) {
    // TODO: Throw an error and handle it in the error page
    return <div>Error</div>
  }

  notFound()
}
ConnectionPage.displayName = "ConnectionPage"
