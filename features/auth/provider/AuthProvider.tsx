import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { Spinner } from "@/components/spinner";
import { Typography } from "@/components/typography";
import { useVerida } from "@/features/verida";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isConnected, isConnecting } = useVerida();

  useEffect(() => {
    const redirectUrl = searchParams.get("redirect") || pathName;

    if (!isConnecting && !isConnected) {
      router.push(
        `/${redirectUrl !== "/" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`
      );
    } else if (isConnected && pathName === "/") {
      router.push(redirectUrl !== "/" ? redirectUrl : "/data");
    }
  }, [isConnected, isConnecting, pathName, searchParams]);

  if (isConnecting) {
    return (
      <div className="container flex h-screen min-h-screen w-full flex-col items-center justify-center">
        <Spinner />
        <Typography variant="heading-1" className="mt-8 text-center">
          Connecting to Verida...
        </Typography>
        <Typography className="mt-4 text-center">
          Please wait while we establish a secure connection. This might take a
          few moments.
        </Typography>
      </div>
    );
  }

  if (!isConnected) {
    return <></>;
  }

  return <>{children}</>;
};
