"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Footer } from "@/components/auth/footer";
import { Navbar } from "@/components/auth/navbar";
import { Swiper } from "@/components/auth/swiper";
import { Spinner } from "@/components/spinner";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks";
import { useVerida } from "@/features/verida";

const sidebarContent = [
  {
    icon: <></>,
    title: "Inbox",
    description:
      "Encrypted messaging between decentralized identities. Approve data requests, accept incoming data and receive notifications from your favorite web3 applications.",
    image: "/images/inbox-page.png",
  },
  {
    icon: <></>,
    title: "Data",
    description:
      "Take ownership of your web2 data, store encrypted in a secure data vault. Control access to your data and provide permission to web3 applications.",
    image: "/images/data-page.png",
  },
  {
    icon: <></>,
    title: "Connections",
    description:
      "Take ownership of your web2 data, store encrypted in a secure data vault. Control access to your data and provide permission to web3 applications.",
    image: "/images/connection-page.png",
  },
];

const Homepage = () => {
  const router = useRouter();
  const { connect, isConnected, isConnecting } = useVerida();
  const { redirectPath } = useAuth();

  useEffect(() => {
    if (isConnected) {
      router.push(redirectPath !== "/" ? redirectPath : "/data");
    }
  }, [isConnected]);

  if (isConnecting) {
    return (
      <div className="container flex h-screen min-h-screen w-full flex-col items-center justify-center">
        <Spinner />
        <Typography variant="heading-1" className="mt-8 text-center">
          Connecting to Verida...
        </Typography>
        <Typography className="mt-4 text-center">
          Please wait while we establish a secure connection. This might take a
          few moments.
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex h-screen min-h-screen">
      <section className="relative flex min-h-full w-full flex-col md:w-[42%]">
        <div className="mx-auto flex min-h-full flex-col px-6 md:max-w-[460px]">
          <Navbar />
          <div className="flex flex-1 flex-col items-start justify-center py-10">
            <Typography variant="heading-1">
              Take control of your personal data
            </Typography>
            <Typography variant="base-l" className="mt-4">
              Manage your crypto, encrypted personal data and zero knowledge
              credentials with the Verida Vault App.
            </Typography>

            <Button
              variant="primary"
              className="mt-8"
              onClick={() => connect()}
            >
              Try the Verida Vault App
            </Button>

            <div className="mt-12 flex h-full flex-1 flex-col rounded-[32px] rounded-b-none bg-radial-gradient text-secondary md:hidden">
              <Swiper data={sidebarContent} />
            </div>
          </div>

          <Footer />
        </div>
      </section>

      <section className="hidden min-h-full flex-1 rounded-[32px] rounded-r-none bg-radial-gradient text-secondary md:flex md:flex-col">
        <Swiper data={sidebarContent} />
      </section>
    </div>
  );
};

export default Homepage;
