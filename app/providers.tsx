"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/features/auth";
import { InboxProvider } from "@/features/inbox/contexts/InboxContext";
import { VeridaProvider } from "@/features/verida";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={new QueryClient()}>
          <VeridaProvider>
            <AuthProvider>
              <InboxProvider>{children}</InboxProvider>
            </AuthProvider>
          </VeridaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Suspense>
  );
}
