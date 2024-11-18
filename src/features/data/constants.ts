import { SAVED_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { DatabaseDefinition } from "@/features/data/types"

const DEFS: DatabaseDefinition[] = [
  {
    id: "credentials",
    title: "Credential",
    titlePlural: "Credentials",
    color: "#5BE1B0",
    databaseVaultName: "credential",
    schemaUrlBase: "https://common.schemas.verida.io/credential/base",
    schemaUrlLatest:
      "https://common.schemas.verida.io/credential/base/v0.2.0/schema.json",
  },
  {
    id: "contacts",
    title: "Contact",
    titlePlural: "Contacts",
    color: "#47E6E5",
    databaseVaultName: "social_contact",
    schemaUrlBase: "https://common.schemas.verida.io/social/contact",
    schemaUrlLatest:
      "https://common.schemas.verida.io/social/contact/v0.1.0/schema.json",
  },
  {
    id: "social-followings",
    title: "Social Following",
    titlePlural: "Social Followings",
    color: "#7A78E5",
    searchType: "followed_pages",
    databaseVaultName: "social_following",
    schemaUrlBase: "https://common.schemas.verida.io/social/following",
    schemaUrlLatest:
      "https://common.schemas.verida.io/social/following/v0.1.0/schema.json",
  },
  {
    id: "social-posts",
    title: "Social Post",
    titlePlural: "Social Posts",
    color: "#EE7D91",
    searchType: "posts",
    databaseVaultName: "social_post",
    schemaUrlBase: "https://common.schemas.verida.io/social/post",
    schemaUrlLatest:
      "https://common.schemas.verida.io/social/post/v0.1.0/schema.json",
  },
  {
    id: "emails",
    title: "Email",
    titlePlural: "Emails",
    color: "#FFB347",
    searchType: "emails",
    databaseVaultName: "social_email",
    schemaUrlBase: "https://common.schemas.verida.io/social/email",
    schemaUrlLatest:
      "https://common.schemas.verida.io/social/email/v0.1.0/schema.json",
  },
  {
    id: "favourites",
    title: "Favourite",
    titlePlural: "Favourites",
    color: "#FF69B4",
    searchType: "favorites",
    databaseVaultName: "favourite",
    schemaUrlBase: "https://common.schemas.verida.io/favourite",
    schemaUrlLatest:
      "https://common.schemas.verida.io/favourite/v0.1.0/schema.json",
  },
  {
    id: "chat-groups",
    title: "Chat group",
    titlePlural: "Chat groups",
    color: "#20B2AA",
    databaseVaultName: "social_chat_group",
    schemaUrlBase: "https://common.schemas.verida.io/social/chat/group",
    schemaUrlLatest:
      "https://common.schemas.verida.io/social/chat/group/v0.1.0/schema.json",
  },
  {
    id: "chat-messages",
    title: "Chat message",
    titlePlural: "Chat messages",
    color: "#9370DB",
    searchType: "messages",
    databaseVaultName: "social_chat_message",
    schemaUrlBase: "https://common.schemas.verida.io/social/chat/message",
    schemaUrlLatest:
      "https://common.schemas.verida.io/social/chat/message/v0.1.0/schema.json",
  },
  {
    id: "calendars",
    title: "Calendar",
    titlePlural: "Calendars",
    color: "#FFD700",
    databaseVaultName: "calendar_data",
    schemaUrlBase: "https://common.schemas.verida.io/social/calendar",
    schemaUrlLatest:
      "https://common.schemas.verida.io/social/calendar/v0.1.0/schema.json",
  },
  {
    id: "calendar-events",
    title: "Calendar event",
    titlePlural: "Calendar events",
    color: "#FFA500",
    searchType: "calendar",
    databaseVaultName: "social_event",
    schemaUrlBase: "https://common.schemas.verida.io/social/event",
    schemaUrlLatest:
      "https://common.schemas.verida.io/social/event/v0.1.0/schema.json",
  },
  {
    id: "files",
    title: "File",
    titlePlural: "Files",
    color: "#FF4500",
    searchType: "files",
    databaseVaultName: "file",
    schemaUrlBase: "https://common.schemas.verida.io/file",
    schemaUrlLatest: "https://common.schemas.verida.io/file/v0.1.0/schema.json",
  },
  SAVED_PROMPTS_DB_DEF,
]

export const DATABASE_DEFS = DEFS.sort((a, b) => a.id.localeCompare(b.id))
