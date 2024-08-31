import { useCallback, useEffect, useMemo, useState } from "react"

/**
 * @deprecated
 */
export const usePagination = (
  initialPage = 0,
  initialLimit = 10,
  totalItems = 0
) => {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)

  useEffect(() => {
    setLimit(initialLimit)
  }, [initialLimit])

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limit),
    [totalItems, limit]
  )

  const nextPage = useCallback(() => {
    setPage((prevPage) => (prevPage + 1 < totalPages ? prevPage + 1 : prevPage))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }, [])

  const setPageSize = useCallback((newLimit: number) => {
    setLimit(newLimit)
    setPage(0) // Reset to the first page when page size changes
  }, [])

  const setCurrentPage = useCallback(
    (newPage: number) => {
      setPage(Math.min(Math.max(newPage - 1, 0), totalPages - 1))
    },
    [totalPages]
  )

  return {
    page,
    limit,
    totalPages,
    nextPage,
    prevPage,
    setPageSize,
    setCurrentPage,
    offset: page * limit,
    hasNextPage: page + 1 < totalPages,
    hasPrevPage: page > 0,
  }
}
