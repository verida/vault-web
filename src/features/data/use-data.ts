import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

import { VeridaRecord } from "@/features/verida-database/types"
import { useVerida } from "@/features/verida/use-verida"

export function useData<TData = VeridaRecord>(database: string) {
  const { did, webUserInstanceRef, isConnected } = useVerida()

  const fetchDataItems = useCallback(async () => {
    if (!isConnected) {
      return []
    }
    try {
      const db = await webUserInstanceRef.current?.openDatabase(database)

      const fetchedItems: TData[] = (await db?.getMany(null, null)) as TData[]
      return fetchedItems || []
    } catch (error) {
      return []
    }
  }, [database, webUserInstanceRef, isConnected])

  const {
    data: dataItems,
    isPending: isDataItemsPending,
    isError: isDataItemsError,
  } = useQuery({
    queryKey: [did, "data", database, "item"],
    queryFn: fetchDataItems,
    enabled: isConnected && !!did,
  })

  const fetchDataItemsCount = useCallback(async () => {
    if (!isConnected) {
      return 0
    }

    try {
      const db = await webUserInstanceRef.current?.openDatabase(database)

      const fetchedItems = await db?.getMany(null, null)
      return fetchedItems?.length || 0
    } catch (error) {
      return 0
    }
  }, [database, webUserInstanceRef, isConnected])

  const {
    data: dataItemsCount,
    isPending: isDataItemsCountPending,
    isError: isDataItemsCountError,
  } = useQuery({
    queryKey: [did, "data", database, "count"],
    queryFn: fetchDataItemsCount,
    enabled: isConnected && !!did,
  })

  return {
    dataItems,
    isDataItemsPending,
    isDataItemsError,
    dataItemsCount,
    isDataItemsCountPending,
    isDataItemsCountError,
  }
}
