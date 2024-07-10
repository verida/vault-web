"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/features/auth/provider/AuthProvider";
import { InboxProvider } from "@/features/inbox/contexts/InboxContext";
import { VeridaProvider } from "@/features/verida";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={new QueryClient()}>
        <VeridaProvider>
          <InboxProvider>
            <AuthProvider>{children}</AuthProvider>
          </InboxProvider>
        </VeridaProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
