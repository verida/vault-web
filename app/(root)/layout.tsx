import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen bg-[#F7F8FA]'>
      <Navbar />
      <main className='flex-grow pt-[72px] pb-20 container'>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
