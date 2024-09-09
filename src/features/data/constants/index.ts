import { DatabaseDefinition } from "@/features/data/types"

export const DATABASE_DEFS: DatabaseDefinition[] = [
  {
    id: "credentials",
    title: "Credential",
    titlePlural: "Credentials",
    color: "#5BE1B0",
    databaseVaultName: "credential",
  },
  {
    id: "contacts",
    title: "Contact",
    titlePlural: "Contacts",
    color: "#47E6E5",
    databaseVaultName: "social_contact",
  },
  {
    id: "social-followings",
    title: "Social Following",
    titlePlural: "Social Followings",
    color: "#7A78E5",
    databaseVaultName: "social_following",
  },
  {
    id: "social-posts",
    title: "Social Post",
    titlePlural: "Social Posts",
    color: "#EE7D91",
    databaseVaultName: "social_post",
  },
  {
    id: "emails",
    title: "Email",
    titlePlural: "Emails",
    color: "#FFB347",
    databaseVaultName: "social_email",
  },
  {
    id: "favourites",
    title: "Favourite",
    titlePlural: "Favourites",
    color: "#FF69B4",
    databaseVaultName: "favourite",
  },
  {
    id: "chat-groups",
    title: "Chat group",
    titlePlural: "Chat groups",
    color: "#20B2AA",
    databaseVaultName: "social_chat_group",
  },
  {
    id: "chat-messages",
    title: "Chat message",
    titlePlural: "Chat messages",
    color: "#9370DB",
    databaseVaultName: "social_chat_message",
  },
]
