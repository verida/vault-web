"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { VeridaProvider } from "@/features/verida";
import { InboxProvider } from "@/features/inbox/contexts/InboxContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryClientProvider client={new QueryClient()}>
        <VeridaProvider>
          <InboxProvider>{children}</InboxProvider>
        </VeridaProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
