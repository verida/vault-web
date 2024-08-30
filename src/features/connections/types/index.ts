import { SVGProps } from "react"

export type Connection = {
  id: string
  item: string
  description: string
  userId?: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export type SupportedData = {
  title: string
  lastSynced: string
  summary: string
  itemCount: number
  backdate: string
}

export type ConnectionLog = {
  source: string
  type: string
  id: number
  message: string
  timestamp: string
}
