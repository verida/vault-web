import type { ComponentProps, ComponentType } from "react"

/**
 * @deprecated
 */
export type LandingPageSlide = {
  title: string
  description: string
  image: string
  imageAlt: string
  icon: ComponentType<ComponentProps<"svg">>
}

/**
 * @deprecated
 */
export const LANDING_PAGE_SLIDES: LandingPageSlide[] = [
  {
    title: "AI Assistant",
    description:
      "Like ChatGPT, but with access to your personal data and 100% private.",
    image: "/images/landing-page/ai-assistant-feature.png",
    imageAlt: "AI Assistant feature",
    icon: () => null,
  },
  // {
  //   title: "Inbox",
  //   description:
  //     "Encrypted messaging between decentralized identities. Approve data requests, accept incoming data and receive notifications from your favorite web3 applications.",
  //   image: "/images/inbox-page.png",
  //   imageAlt: "Inbox feature",
  //   icon: () => null,
  // },
  {
    title: "Data",
    description:
      "Take ownership of your web2 data, store encrypted in a secure data vault. Control access to your data and provide permission to web3 applications.",
    image: "/images/landing-page/data-feature.png",
    imageAlt: "Data feature",
    icon: () => null,
  },
  {
    title: "Connections",
    description:
      "Take ownership of your web2 data, store encrypted in a secure data vault. Control access to your data and provide permission to web3 applications.",
    image: "/images/landing-page/connections-feature.png",
    imageAlt: "Connections feature",
    icon: () => null,
  },
]
