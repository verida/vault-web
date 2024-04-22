import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export const useConnectionAuthParams = () => {
  const searchParams = useSearchParams();

  const provider = searchParams.get("provider");

  const authParams = useMemo(() => {
    let obj: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      if (key !== "provider") {
        obj[key] = value;
      }
    });

    return obj;
  }, [searchParams]);

  return { provider, authParams };
};
