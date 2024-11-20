import {
  AI_ASSISTANTS_DB_DEF,
  AI_PROMPTS_DB_DEF,
} from "@/features/assistants/constants"
import { DatabaseDefinition } from "@/features/data/types"

/**
 * Not sorted and including databases definitions that are not included in the UI
 */
export const ALL_DATABASE_DEFS: DatabaseDefinition[] = [
  {
    id: "credentials",
    type: "user",
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
    type: "user",
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
    type: "user",
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
    type: "user",
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
    type: "user",
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
    type: "user",
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
    type: "user",
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
    type: "user",
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
    type: "user",
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
    type: "user",
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
    type: "user",
    title: "File",
    titlePlural: "Files",
    color: "#FF4500",
    searchType: "files",
    databaseVaultName: "file",
    schemaUrlBase: "https://common.schemas.verida.io/file",
    schemaUrlLatest: "https://common.schemas.verida.io/file/v0.1.0/schema.json",
  },
  AI_PROMPTS_DB_DEF,
  AI_ASSISTANTS_DB_DEF,
]

/**
 * Sorted and excluding databases definitions that are not included in the UI
 */
export const USER_DATABASE_DEFS = ALL_DATABASE_DEFS.filter(
  (db) => db.type === "user"
).sort((a, b) => a.id.localeCompare(b.id))
