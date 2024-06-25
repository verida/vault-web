import { useRouter } from "next/navigation";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useVerida } from "@/features/verida";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isConnected } = useVerida();
  
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <Navbar />
      <main className="container flex-grow pb-20 pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
