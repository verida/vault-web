"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { VeridaProvider } from "@/features/verida";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <VeridaProvider>
        <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
      </VeridaProvider>
    </ThemeProvider>
  );
}
