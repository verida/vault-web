import {
  DataConnection,
  DataConnectionLog,
  DataProvider,
} from "@/features/data-connections/types"

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

export const MOCK_USER_DATA_CONNECTIONS: DataConnection[] = [
  {
    name: "twitter:123",
    provider: "twitter",
    providerId: "123",
    profile: {
      id: "123",
      name: "John Doe",
      avatar: {
        uri: "https://example.com/avatar.jpg",
      },
      givenName: "John",
      familyName: "Doe",
      email: "john.doe@example.com",
    },
    syncStatus: "connected",
    syncFrequency: "hour",
    syncStart: "2023-05-01T10:00:00Z",
    syncEnd: "2023-05-01T10:05:00Z",
    handlers: [],
  },
  {
    name: "google:456",
    provider: "google",
    providerId: "456",
    profile: {
      id: "456",
      name: "Jane Smith",
      avatar: {
        uri: "https://example.com/jane-avatar.jpg",
      },
      givenName: "Jane",
      familyName: "Smith",
      email: "jane.smith@example.com",
    },
    syncStatus: "connected",
    syncFrequency: "hour",
    syncStart: "2023-05-02T09:00:00Z",
    syncEnd: "2023-05-02T09:10:00Z",
    handlers: [
      {
        name: "gmail",
        enabled: true,
        status: "enabled",
        syncMessage: "Batch complete (200). More results pending.",
        config: {
          backdate: "3-months",
        },
      },
    ],
  },
]

/**
 * @deprecated
 */
export const MOCK_DATA_CONNECTION_LOGS: DataConnectionLog[] = [
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
