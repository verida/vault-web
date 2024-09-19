import React from "react"

export type LandingPageSlide = {
  title: string
  description: string
  image: string
  imageAlt: string
  icon: React.ComponentType<React.ComponentProps<"svg">>
}

export const LANDING_PAGE_SLIDES: LandingPageSlide[] = [
  {
    title: "Inbox",
    description:
      "Encrypted messaging between decentralized identities. Approve data requests, accept incoming data and receive notifications from your favorite web3 applications.",
    image: "/images/inbox-page.png",
    imageAlt: "Inbox feature",
    icon: () => null,
  },
  {
    title: "Data",
    description:
      "Take ownership of your web2 data, store encrypted in a secure data vault. Control access to your data and provide permission to web3 applications.",
    image: "/images/data-page.png",
    imageAlt: "Data feature",
    icon: () => null,
  },
  {
    title: "Connections",
    description:
      "Take ownership of your web2 data, store encrypted in a secure data vault. Control access to your data and provide permission to web3 applications.",
    image: "/images/connection-page.png",
    imageAlt: "Connections feature",
    icon: () => null,
  },
]
