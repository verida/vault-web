"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { InboxProvider } from "@/features/inbox/contexts/InboxContext";
import { VeridaProvider } from "@/features/verida";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={new QueryClient()}>
          <VeridaProvider>
            <TooltipProvider>
              <InboxProvider>{children}</InboxProvider>
            </TooltipProvider>
          </VeridaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Suspense>
  );
}
