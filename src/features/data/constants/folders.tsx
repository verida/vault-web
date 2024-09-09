import React from "react"

import { FolderContacts } from "@/components/icons/folder-contacts"
import { FolderCredentialsIcon } from "@/components/icons/folder-credentials-icon"
import { FolderSocial } from "@/components/icons/folder-social"
import { DatabaseDefinition } from "@/features/data/types"

export const databaseDefinitions: DatabaseDefinition[] = [
  {
    name: "credentials",
    title: "Credential",
    titlePlural: "Credentials",
    color: "#5BE1B0",
    icon: <FolderCredentialsIcon />,
    database: "credential",
  },
  {
    name: "contacts",
    title: "Contact",
    titlePlural: "Contacts",
    color: "#47E6E5",
    icon: <FolderContacts />,
    database: "social_contact",
    // layouts: {
    //   list: ["firstName", "lastName", "email", "mobile"],
    //   view: ["firstName", "lastName", "email", "mobile", "insertedAt"],
    // },
  },
  {
    name: "social-following",
    title: "Following",
    titlePlural: "Social Followings",
    color: "#7A78E5",
    icon: <FolderSocial />,
    database: "social_following",
    // layouts: {
    //   list: ["name", "sourceApplication"],
    //   view: [
    //     "name",
    //     "sourceApplication",
    //     "followedTimestamp",
    //     "sourceId",
    //     "uri",
    //   ],
    // },
  },
  {
    name: "social-posts",
    title: "Post",
    titlePlural: "Social Posts",
    color: "#EE7D91",
    icon: <FolderSocial />,
    database: "social_post",
    // layouts: {
    //   list: ["name", "sourceApplication"],
    //   view: [
    //     "name",
    //     "content",
    //     "uri",
    //     "sourceApplication",
    //     "sourceId",
    //     "insertedAt",
    //   ],
    // },
  },
]
