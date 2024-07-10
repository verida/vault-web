import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { useVerida } from "@/features/verida";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isConnected, isConnecting } = useVerida();

  useEffect(() => {
    const redirectUrl = searchParams.get("redirect") || pathName;
    console.log(redirectUrl);

    if (!isConnecting && !isConnected) {
      router.push(
        `/${redirectUrl !== "/" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`
      );
    } else if (isConnected && pathName === "/") {
      router.push(redirectUrl !== "/" ? redirectUrl : "/data");
    }
  }, [isConnected, isConnecting, pathName, searchParams]);

  if (isConnecting) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
