import { Discord } from "@/components/icons/connection-discord"
import { Facebook } from "@/components/icons/connection-facebook"
import { Github } from "@/components/icons/connection-github"
import { Instagram } from "@/components/icons/connection-instagram"
import { Telegram } from "@/components/icons/connection-telegram"
import { Twitter } from "@/components/icons/connection-twitter"
import { Youtube } from "@/components/icons/connection-youtube"

import { Connection, ConnectionLog, SupportedData } from ".."

export const connections: Connection[] = [
  {
    id: "X",
    icon: Twitter,
    item: "tweets",
    description: "Connect your X Account to share your tweets with us.",
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

export const myConnections: Connection[] = [
  {
    id: "X",
    icon: Twitter,
    item: "tweets",
    description: "Connect your X Account to share your tweets with us.",
    userId: "@tahpot",
  },
]

export const supportedData: SupportedData[] = [
  {
    title: "Emails",
    lastSynced: "13 May 2024, 10:00am",
    summary: "Data synchronization was completed without major issues",
    itemCount: 3235,
    backdate: "3 months",
  },
  {
    title: "Tweets",
    lastSynced: "13 May 2024, 10:00am",
    summary: "Data synchronization was completed without major issues",
    itemCount: 3235,
    backdate: "1 month",
  },
  {
    title: "Followers",
    lastSynced: "13 May 2024, 10:00am",
    summary: "Data synchronization was completed without major issues",
    itemCount: 3235,
    backdate: "3 months",
  },
  {
    title: "Following",
    lastSynced: "13 May 2024, 10:00am",
    summary: "Data synchronization was completed without major issues",
    itemCount: 3235,
    backdate: "3 months",
  },
  {
    title: "Likes",
    lastSynced: "13 May 2024, 10:00am",
    summary: "Data synchronization was completed without major issues",
    itemCount: 3235,
    backdate: "3 months",
  },
]

export const connectionLogs: ConnectionLog[] = [
  {
    source: "X",
    type: "Social Posts",
    id: 12345667789,
    message:
      "Message ID (1287112938) is not supported it might be incorrect, corrupted, or not recognized by the syste or the message format associated with the ID might be incompatible with the current system or application.",
    timestamp: "2 Jan 2024, 12:16 pm",
  },
  {
    source: "X",
    type: "Social Posts",
    id: 12345667789,
    message:
      "Message ID (1287112938) is not supported it might be incorrect, corrupted, or not recognized by the syste or the message format associated with the ID might be incompatible with the current system or application.",
    timestamp: "2 Jan 2024, 12:16 pm",
  },
  {
    source: "X",
    type: "Social Posts",
    id: 12345667789,
    message:
      "Message ID (1287112938) is not supported it might be incorrect, corrupted, or not recognized by the syste or the message format associated with the ID might be incompatible with the current system or application.",
    timestamp: "2 Jan 2024, 12:16 pm",
  },
]
