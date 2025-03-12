import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
  title: "Edit Profile",
}

export interface ProfileEditLayoutProps {
  children: ReactNode
}

export default function ProfileEditLayout(props: ProfileEditLayoutProps) {
  const { children } = props

  return children
}
ProfileEditLayout.displayName = "ProfileEditLayout"
