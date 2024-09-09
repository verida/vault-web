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
    id: "social-following",
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
]
