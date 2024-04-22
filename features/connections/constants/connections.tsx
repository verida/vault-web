import { Connection } from "..";

import { Twitter } from "@/components/icons/twitter";
import { Instagram } from "@/components/icons/instagram";
import { Discord } from "@/components/icons/discord";
import { Telegram } from "@/components/icons/telegram";
import { Github } from "@/components/icons/github";
import { Facebook } from "@/components/icons/facebook";
import { Youtube } from "@/components/icons/youtube";

export const connections: Connection[] = [
  {
    name: "twitter",
    icon: Twitter,
    label: "Twitter",
    description: "Connect your Twitter Account to share your tweets with us.",
  },
  {
    name: "instagram",
    icon: Instagram,
    label: "Instagram",
    description: "Connect your Instagram Account to share your port with us.",
  },
  {
    name: "discord",
    icon: Discord,
    label: "Discord",
    description: "Connect your Discord Account to share your post with us.",
  },
  {
    name: "telegram",
    icon: Telegram,
    label: "Telegram",
    description: "Connect your Telegram Account to share your post with us.",
  },
  {
    name: "github",
    icon: Github,
    label: "Github",
    description: "Connect your Github Account to share your post with us.",
  },
  {
    name: "facebook",
    icon: Facebook,
    label: "Facebook",
    description: "Connect your Facebook Account to share your post with us.",
  },
  {
    name: "youtube",
    icon: Youtube,
    label: "Youtube",
    description: "Connect your Youtube Account to share your video with us.",
  },
];
