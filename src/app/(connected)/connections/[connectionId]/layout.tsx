import { type ReactNode } from "react"

export interface ConnectionLayoutProps {
  children: ReactNode
}

export default function ConnectionLayout(props: ConnectionLayoutProps) {
  const { children } = props

  return children
}
ConnectionLayout.displayName = "ConnectionLayout"
