import { useState, useCallback } from "react";

export const usePagination = (initialPage = 0, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  }, []);

  const setPageSize = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(0); // Reset to the first page when page size changes
  }, []);

  return {
    page,
    limit,
    nextPage,
    prevPage,
    setPageSize,
    offset: page * limit,
  };
};
