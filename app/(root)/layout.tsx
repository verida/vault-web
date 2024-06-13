import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen bg-[#F7F8FA]'>
      <Navbar />
      <main className='min-h-[calc(100vh-144px)] my-[72px] container flex flex-col'>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
