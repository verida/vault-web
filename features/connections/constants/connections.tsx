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
  },
  {
    id: "Instagram",
    icon: Instagram,
    item: "port",
  },
  {
    id: "Discord",
    icon: Discord,
    item: "post",
  },
  {
    id: "Telegram",
    icon: Telegram,
    item: "post",
  },
  {
    id: "GitHub",
    icon: Github,
    item: "post",
  },
  {
    id: "Facebook",
    icon: Facebook,
    item: "post",
  },
  {
    id: "Youtube",
    icon: Youtube,
    item: "video",
  },
];
