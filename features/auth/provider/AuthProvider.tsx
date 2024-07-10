import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { useVerida } from "@/features/verida";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isConnected, isConnecting } = useVerida();

  console.log(isConnected, isConnecting);

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push("/");
    }
    if (isConnected && pathName === "/") {
      router.push("/data");
    }
  }, [isConnected, isConnecting, pathName, searchParams]);

  if (isConnecting) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
