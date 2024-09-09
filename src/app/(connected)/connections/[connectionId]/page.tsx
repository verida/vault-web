"use client"

import { notFound } from "next/navigation"

import { DataConnectionPageContent } from "@/app/(connected)/connections/[connectionId]/_components/data-connection-page-content"
import ConnectionLoadingPage from "@/app/(connected)/connections/[connectionId]/loading"
import { useDataConnection } from "@/features/data-connections"

type ConnectionPageProps = {
  params: { connectionId: string }
}

export default function ConnectionPage(props: ConnectionPageProps) {
  const { params } = props
  const { connectionId: encodedConnectionId } = params
  const connectionId = decodeURIComponent(encodedConnectionId)

  const { connection, isLoading, isError, error } =
    useDataConnection(connectionId)

  if (connection) {
    return (
      <DataConnectionPageContent
        connection={connection}
        className="pb-4 md:pb-6 xl:pb-8"
      />
    )
  }

  if (isLoading) {
    // TODO: Show a loading state
    return <ConnectionLoadingPage />
  }

  if (isError) {
    throw error
  }

  notFound()
}
ConnectionPage.displayName = "ConnectionPage"
