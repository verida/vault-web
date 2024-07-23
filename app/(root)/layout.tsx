"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const AppLayout = ({
  children,
  sheet,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
}) => {
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
