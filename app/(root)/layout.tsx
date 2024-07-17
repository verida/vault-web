"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/features/auth/hooks";
import { useVerida } from "@/features/verida";

const AppLayout = ({
  children,
  sheet,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isConnected } = useVerida();
  const { setRedirectPath } = useAuth();

  useEffect(() => {
    const redirectUrl = searchParams.get("redirect") || pathName;

    if (!isConnected) {
      setRedirectPath(redirectUrl);
      router.push("/");
    }
  }, [isConnected, router]);

  if (!isConnected) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="container flex flex-grow flex-col pt-[72px]">
        {sheet}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
