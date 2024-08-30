"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

type QueriesProviderProps = {
  children: React.ReactNode
}

export function QueriesProvider(props: QueriesProviderProps) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
