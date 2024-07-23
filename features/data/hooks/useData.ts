import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { useVerida } from "@/features/verida";

export const useData = (database: string) => {
  const { webUserInstanceRef, isConnected } = useVerida();

  const fetchDataItems = useCallback(async () => {
    if (!isConnected) {
      return [];
    }
    try {
      const db = await webUserInstanceRef.current?.openDatabase(database);

      const fetchedItems: any[] = await db?.getMany(null, null);
      return fetchedItems || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [database, webUserInstanceRef, isConnected]);

  const {
    data: dataItems,
    isPending: isDataItemsPending,
    isError: isDataItemsError,
  } = useQuery({
    queryKey: ["data", "item", database],
    queryFn: fetchDataItems,
    enabled: isConnected,
  });

  const fetchDataItemsCount = useCallback(async () => {
    if (!isConnected) return 0;
    try {
      const db = await webUserInstanceRef.current?.openDatabase(database);

      const fetchedItems = await db?.getMany(null, null);
      return fetchedItems?.length || 0;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [database, webUserInstanceRef, isConnected]);

  const {
    data: dataItemsCount,
    isPending: isDataItemsCountPending,
    isError: isDataItemsCountError,
  } = useQuery({
    queryKey: ["data", "count", database],
    queryFn: fetchDataItemsCount,
    enabled: isConnected,
  });

  return {
    dataItems,
    isDataItemsPending,
    isDataItemsError,
    dataItemsCount,
    isDataItemsCountPending,
    isDataItemsCountError,
  };
};
