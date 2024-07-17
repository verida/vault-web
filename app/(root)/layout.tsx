"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/features/auth/provider/AuthProvider";

const AppLayout = ({
  children,
  sheet,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
}) => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="container flex flex-grow flex-col pt-[72px]">
          {sheet}
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default AppLayout;
