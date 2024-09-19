import { Discord } from "@/components/icons/discord"
import { Linkedin } from "@/components/icons/linkedin"
import { Medium } from "@/components/icons/medium"
import { Telegram } from "@/components/icons/telegram"
import { Twitter } from "@/components/icons/twitter"
import { Youtube } from "@/components/icons/youtube"

export const VERIDA_PLATFORMS = [
  {
    label: "Verida on X",
    url: "https://twitter.com/verida_io",
    icon: (props: React.ComponentProps<"svg">) => (
      <Twitter height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on Discord",
    url: "https://discord.verida.io/",
    icon: (props: React.ComponentProps<"svg">) => (
      <Discord height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on Telegram",
    url: "https://t.me/verida_community",
    icon: (props: React.ComponentProps<"svg">) => (
      <Telegram height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on Medium",
    url: "https://news.verida.io/",
    icon: (props: React.ComponentProps<"svg">) => (
      <Medium height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on YouTube",
    url: "https://www.youtube.com/@verida_io",
    icon: (props: React.ComponentProps<"svg">) => (
      <Youtube height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on LinkedIn",
    url: "https://www.linkedin.com/company/verida-technology",
    icon: (props: React.ComponentProps<"svg">) => (
      <Linkedin height="100%" width="100%" {...props} />
    ),
  },
]
