"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="container flex-grow pb-20 pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
