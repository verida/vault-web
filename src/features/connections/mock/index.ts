// import { Discord } from "@/components/icons/connection-discord"
// import { Facebook } from "@/components/icons/connection-facebook"
// import { Github } from "@/components/icons/connection-github"
// import { Instagram } from "@/components/icons/connection-instagram"
// import { Telegram } from "@/components/icons/connection-telegram"
// import { Twitter } from "@/components/icons/connection-twitter"
// import { Youtube } from "@/components/icons/connection-youtube"
import {
  Connection,
  ConnectionLog,
  DataProvider,
  SupportedData,
} from "@/features/connections/types"

export const MOCK_DATA_PROVIDERS: DataProvider[] = [
  {
    name: "facebook",
    label: "Facebook",
    icon: "https://127.0.0.1:5021/assets/facebook/icon.png",
    description: "Connect your Facebook Account to share your post with us.",
  },
  {
    name: "twitter",
    label: "Twitter",
    icon: "https://127.0.0.1:5021/assets/twitter/icon.png",
    description: "Connect your X Account to share your tweets with us.",
  },
  {
    name: "discord",
    label: "Discord",
    icon: "https://127.0.0.1:5021/assets/discord/icon.png",
    description: "Connect your Discord Account to share your post with us.",
  },
  {
    name: "google",
    label: "Google",
    icon: "https://127.0.0.1:5021/assets/google/icon.png",
    description: "",
  },
  {
    name: "telegram",
    label: "Telegram",
    icon: "https://127.0.0.1:5021/assets/telegram/icon.png",
    description: "Connect your Telegram Account to share your post with us.",
  },
]

export const MOCK_USER_CONNECTIONS: Connection[] = [
  {
    name: "twitter",
    label: "Twitter",
    icon: "https://127.0.0.1:5021/assets/twitter/icon.png",
    description: "Connect your X Account to share your tweets with us.",
    userId: "@tahpot",
  },
]

export const MOCK_SUPPORTED_DATA: SupportedData[] = [
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

export const MOCK_CONNECTION_LOGS: ConnectionLog[] = [
  {
    source: "twitter",
    type: "Social Posts",
    id: 12345667789,
    message:
      "Message ID (1287112938) is not supported it might be incorrect, corrupted, or not recognized by the syste or the message format associated with the ID might be incompatible with the current system or application.",
    timestamp: "2 Jan 2024, 12:16 pm",
  },
  {
    source: "twitter",
    type: "Social Posts",
    id: 12345667789,
    message:
      "Message ID (1287112938) is not supported it might be incorrect, corrupted, or not recognized by the syste or the message format associated with the ID might be incompatible with the current system or application.",
    timestamp: "2 Jan 2024, 12:16 pm",
  },
  {
    source: "twitter",
    type: "Social Posts",
    id: 12345667789,
    message:
      "Message ID (1287112938) is not supported it might be incorrect, corrupted, or not recognized by the syste or the message format associated with the ID might be incompatible with the current system or application.",
    timestamp: "2 Jan 2024, 12:16 pm",
  },
]
