import { AuthorizedAppRecord } from "@/features/authorized-apps/types"

export const MOCK_AUTHORIZED_APPS: AuthorizedAppRecord[] = [
  {
    _id: "1",
    name: "TaskFlow Pro",
    url: "https://taskflow-pro.example.com",
    lastAccessedAt: "2024-02-01T12:00:00Z",
    scopes: [
      { database: "calendar_data", operation: "read" },
      { database: "social_event", operation: "write" },
      { database: "social_chat_message", operation: "read" },
    ],
  },
  {
    _id: "2",
    name: "ConnectMail Plus",
    url: "https://connectmail.example.com",
    lastAccessedAt: "2024-02-10T15:30:00Z",
    scopes: [
      { database: "social_email", operation: "read" },
      { database: "social_contact", operation: "read" },
    ],
  },
  {
    _id: "3",
    name: "SecureVault Manager",
    url: "https://securevault.example.com",
    lastAccessedAt: "2024-02-12T09:15:00Z",
    scopes: [
      { database: "credential", operation: "write" },
      { database: "social_contact", operation: "read" },
      { database: "file", operation: "read" },
    ],
  },
  {
    _id: "4",
    name: "TeamChat Hub",
    url: "https://teamchat.example.com",
    lastAccessedAt: "2024-02-13T18:45:00Z",
    scopes: [
      { database: "social_chat_message", operation: "write" },
      { database: "social_chat_group", operation: "read" },
      { database: "social_contact", operation: "read" },
    ],
  },
  {
    _id: "5",
    name: "Web3 Identity Bridge",
    url: "https://identity-bridge.example.com",
    lastAccessedAt: "2024-02-14T11:20:00Z",
    scopes: [
      { database: "social_contact", operation: "read" },
      { database: "credential", operation: "read" },
      { database: "social_following", operation: "read" },
      { database: "favourite", operation: "read" },
      { database: "file", operation: "read" },
    ],
  },
  {
    _id: "6",
    name: "SocialSphere Connect",
    url: "https://socialsphere.example.com",
    lastAccessedAt: "2024-02-15T14:10:00Z",
    scopes: [
      { database: "social_post", operation: "write" },
      { database: "social_following", operation: "read" },
    ],
  },
  {
    _id: "7",
    name: "EventSync Pro",
    url: "https://eventsync.example.com",
    lastAccessedAt: "2024-02-16T16:25:00Z",
    scopes: [
      { database: "social_event", operation: "write" },
      { database: "calendar_data", operation: "read" },
      { database: "social_chat_group", operation: "read" },
      { database: "social_contact", operation: "read" },
    ],
  },
  {
    _id: "8",
    name: "CloudStore Sync",
    url: "https://cloudstore.example.com",
    lastAccessedAt: "2024-02-17T08:50:00Z",
    scopes: [{ database: "file", operation: "write" }],
  },
  {
    _id: "9",
    name: "DeFi Portfolio Tracker",
    url: "https://defi-tracker.example.com",
    lastAccessedAt: "2024-02-18T13:40:00Z",
    scopes: [
      { database: "credential", operation: "read" },
      { database: "favourite", operation: "write" },
      { database: "social_following", operation: "read" },
      { database: "social_contact", operation: "read" },
      { database: "file", operation: "read" },
      { database: "social_post", operation: "read" },
    ],
  },
  {
    _id: "10",
    name: "ContentHub Studio",
    url: "https://contenthub.example.com",
    lastAccessedAt: "2024-02-19T20:15:00Z",
    scopes: [{ database: "social_post", operation: "write" }],
  },
  {
    _id: "11",
    name: "NFT Collection Manager",
    url: "https://nft-manager.example.com",
    lastAccessedAt: "2024-02-20T10:30:00Z",
    scopes: [
      { database: "file", operation: "read" },
      { database: "social_post", operation: "write" },
      { database: "credential", operation: "read" },
    ],
  },
  {
    _id: "12",
    name: "WorkFlow Organizer",
    url: "https://workflow.example.com",
    lastAccessedAt: "2024-02-21T17:05:00Z",
    scopes: [
      { database: "social_event", operation: "write" },
      { database: "social_chat_group", operation: "read" },
      { database: "calendar_data", operation: "read" },
      { database: "social_contact", operation: "read" },
    ],
  },
]
