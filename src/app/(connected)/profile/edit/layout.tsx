import { type ReactNode } from "react"

export interface ProfileEditLayoutProps {
  children: ReactNode
}

export default function ProfileEditLayout(props: ProfileEditLayoutProps) {
  const { children } = props

  return children
}
ProfileEditLayout.displayName = "ProfileEditLayout"
