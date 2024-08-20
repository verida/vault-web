import { Discord } from "@/components/icons/connection-discord"
import { Facebook } from "@/components/icons/connection-facebook"
import { Github } from "@/components/icons/connection-github"
import { Instagram } from "@/components/icons/connection-instagram"
import { Telegram } from "@/components/icons/connection-telegram"
import { Twitter } from "@/components/icons/connection-twitter"
import { Youtube } from "@/components/icons/connection-youtube"

import { Connection } from ".."

export const connections: Connection[] = [
  {
    id: "Twitter",
    icon: Twitter,
    item: "tweets",
    description: "Connect your Twitter Account to share your tweets with us.",
  },
  {
    id: "Instagram",
    icon: Instagram,
    item: "port",
    description: "Connect your Instagram Account to share your port with us.",
  },
  {
    id: "Discord",
    icon: Discord,
    item: "post",
    description: "Connect your Discord Account to share your post with us.",
  },
  {
    id: "Telegram",
    icon: Telegram,
    item: "post",
    description: "Connect your Telegram Account to share your post with us.",
  },
  {
    id: "GitHub",
    icon: Github,
    item: "post",
    description: "Connect your Github Account to share your post with us.",
  },
  {
    id: "Facebook",
    icon: Facebook,
    item: "post",
    description: "Connect your Facebook Account to share your post with us.",
  },
  {
    id: "Youtube",
    icon: Youtube,
    item: "video",
    description: "Connect your Youtube Account to share your video with us.",
  },
]
