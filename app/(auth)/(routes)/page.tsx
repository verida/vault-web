import React from "react";
import { Navbar } from "@/components/auth/navbar";
import { Footer } from "@/components/auth/footer";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className='min-h-screen h-screen flex'>
      <div className='w-full md:w-[42%] relative flex h-full flex-col'>
        <div className='max-w-[460px] mx-auto h-full flex flex-col px-6'>
          <Navbar />
          <div className='flex-1 flex flex-col justify-center items-start'>
            <h1 className='text-[40px] font-bold leading-tight'>Take control of your personal data</h1>
            <p className='font-semibold mt-4'>
              Manage your crypto, encrypted personal data and zero knowledge credentials with the Verida Vault App.
            </p>
            <Button className='mt-8 bg-purple-500'>Try the Verida Vault App</Button>
          </div>
          <Footer />
        </div>
      </div>

      <div className='rounded-[32px] rounded-r-none bg-radial-gradient h-full flex-1 hidden md:flex md:flex-col text-white'>
        <h2>Inbox</h2>
        <p>
          Encrypted messaging between decentralized identities. Approve data requests, accept incoming data and receive
          notifications from your favorite web3 applications.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
