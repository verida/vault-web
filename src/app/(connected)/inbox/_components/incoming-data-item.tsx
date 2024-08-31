import Image from "next/image"

import { Typography } from "@/components/typography"

export type IncomingDataItemProps = {
  item: Record<string, any>
}

export function IncomingDataItem(props: IncomingDataItemProps) {
  const { item } = props

  return (
    <div className="space-y-2 rounded-sm bg-muted p-4">
      <div className="flex items-center gap-2">
        <Image
          src={item.icon || ""}
          width="32"
          height="32"
          alt="incoming-item-icon"
        />
        <Typography variant="heading-5">{item.name}</Typography>
      </div>
      <Typography variant="base-s-regular">{item.summary}</Typography>
    </div>
  )
}
