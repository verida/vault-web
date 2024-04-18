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
];
