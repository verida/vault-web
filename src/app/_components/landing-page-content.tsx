import React from "react"

import { ConnectionButton } from "@/app/_components/connection-button"
import { LandingPageFooter } from "@/app/_components/landing-page-footer"
import { LandingPageHeader } from "@/app/_components/landing-page-header"
import { Swiper } from "@/app/_components/swiper"
import { Typography } from "@/components/typography"

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
]

export type LandingPageContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>

export function LandingPageContent(props: LandingPageContentProps) {
  const { ...divProps } = props

  return (
    <div {...divProps}>
      <div className="bg-surface flex h-screen min-h-screen">
        <section className="relative flex min-h-full w-full flex-col md:w-[42%]">
          <div className="mx-auto flex min-h-full flex-col px-6 md:max-w-[460px]">
            <LandingPageHeader />
            <div className="flex flex-1 flex-col items-start justify-center py-10">
              <Typography variant="heading-1">
                Take control of your personal data
              </Typography>
              <Typography variant="base-l" className="mt-4">
                Securely manage your personal data and zero knowledge
                credentials with the Verida Vault App.
              </Typography>
              <ConnectionButton className="mt-8" />
              <div className="mt-12 flex h-full flex-1 flex-col rounded-[32px] rounded-b-none bg-radial-gradient text-primary-foreground md:hidden">
                <Swiper data={sidebarContent} />
              </div>
            </div>
            <LandingPageFooter />
          </div>
        </section>

        <section className="hidden min-h-full flex-1 rounded-[32px] rounded-r-none bg-radial-gradient text-primary-foreground md:flex md:flex-col">
          <Swiper data={sidebarContent} />
        </section>
      </div>
    </div>
  )
}
