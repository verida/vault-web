"use client"

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { Logger } from "@/features/telemetry"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
  queryCache: new QueryCache({
    onError: (cause, query) => {
      const logCategory =
        query.meta?.logCategory === "string"
          ? query.meta?.logCategory
          : "Queries"

      const logger = Logger.create(logCategory)

      const error =
        typeof query.meta?.errorMessage === "string"
          ? new Error(query.meta.errorMessage, { cause })
          : cause

      logger.error(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (cause, _variables, _context, mutation) => {
      const logCategory =
        mutation.meta?.logCategory === "string"
          ? mutation.meta?.logCategory
          : "Queries"

      const logger = Logger.create(logCategory)

      const error =
        typeof mutation.meta?.errorMessage === "string"
          ? new Error(mutation.meta.errorMessage, { cause })
          : cause

      logger.error(error)
    },
  }),
})

type QueriesProviderProps = {
  children: React.ReactNode
}

export function QueriesProvider(props: QueriesProviderProps) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
