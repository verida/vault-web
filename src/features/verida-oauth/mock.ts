import { VeridaOauthPayload } from "@/features/verida-oauth/types"

export const MOCK_OAUTH_PAYLOAD: VeridaOauthPayload = {
  name: "ACME",
  url: "https://verida.network",
  scopes: [
    {
      database: "social_email",
      operation: "read",
    },
    {
      database: "social_contact",
      operation: "write",
    },
    {
      database: "social_chat_message",
      operation: "read",
    },
  ],
}
