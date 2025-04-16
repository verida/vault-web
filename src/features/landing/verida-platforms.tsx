import type { ComponentProps, ComponentType } from "react"

import { DiscordLogo } from "@/features/landing/components/discord-logo"
import { LinkedinLogo } from "@/features/landing/components/linkedin-logo"
import { MediumLogo } from "@/features/landing/components/medium-logo"
import { TelegramLogo } from "@/features/landing/components/telegram-logo"
import { XLogo } from "@/features/landing/components/x-logo"
import { YoutubeLogo } from "@/features/landing/components/youtube-logo"

export type VeridaPlatform = {
  label: string
  url: string
  icon: ComponentType<ComponentProps<"svg">>
}

export const VERIDA_PLATFORMS: VeridaPlatform[] = [
  {
    label: "Verida on X",
    url: "https://x.com/verida_io",
    icon: (props: ComponentProps<"svg">) => (
      <XLogo height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on Discord",
    url: "https://discord.verida.io/",
    icon: (props: ComponentProps<"svg">) => (
      <DiscordLogo height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on Telegram",
    url: "https://t.me/verida_community",
    icon: (props: ComponentProps<"svg">) => (
      <TelegramLogo height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on Medium",
    url: "https://news.verida.io/",
    icon: (props: ComponentProps<"svg">) => (
      <MediumLogo height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on YouTube",
    url: "https://www.youtube.com/@verida_io",
    icon: (props: ComponentProps<"svg">) => (
      <YoutubeLogo height="100%" width="100%" {...props} />
    ),
  },
  {
    label: "Verida on LinkedIn",
    url: "https://www.linkedin.com/company/verida-technology",
    icon: (props: ComponentProps<"svg">) => (
      <LinkedinLogo height="100%" width="100%" {...props} />
    ),
  },
]
