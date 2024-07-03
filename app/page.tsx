"use client";

import { Footer } from "@/components/auth/footer";
import { Navbar } from "@/components/auth/navbar";
import { Swiper } from "@/components/auth/swiper";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useVerida } from "@/features/verida";

import Layout from "./(root)/layout";

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
  const { isConnected, isCheckingConnection, connect } = useVerida();

  if (!isConnected && !isCheckingConnection) {
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
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center"></div>
    </Layout>
  );
};

export default Homepage;
