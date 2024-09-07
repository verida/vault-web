"use client"

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import {
  getLogger,
  invalidateQueries,
  logError,
} from "@/features/queries/utils"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
  queryCache: new QueryCache({
    onError: (cause, query) => {
      const logger = getLogger(query.meta?.logCategory)
      logError(cause, logger, query.meta?.errorMessage)
    },
  }),
  mutationCache: new MutationCache({
    onSettled: (_data, _error, _variables, _context, mutation) => {
      const logger = getLogger(mutation.meta?.logCategory)

      const keys = mutation.meta?.onSettledInvalidationQueryKeys
      if (keys) {
        invalidateQueries(queryClient, keys, logger)
      }
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      const logger = getLogger(mutation.meta?.logCategory)

      const keys = mutation.meta?.onSuccessInvalidationQueryKeys
      if (keys) {
        invalidateQueries(queryClient, keys, logger)
      }
    },
    onError: (cause, _variables, _context, mutation) => {
      const logger = getLogger(mutation.meta?.logCategory)

      const keys = mutation.meta?.onErrorInvalidationQueryKeys
      if (keys) {
        invalidateQueries(queryClient, keys, logger)
      }

      logError(cause, logger, mutation.meta?.errorMessage)
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
