import { Typography } from "@/components/typography"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export type IncomingDataItemProps = {
  item: Record<string, any>
}

export function IncomingDataItem(props: IncomingDataItemProps) {
  const { item } = props

  return (
    <div className="space-y-2 rounded-sm bg-surface-active p-4">
      <div className="flex items-center gap-2">
        {item.icon ? (
          <Avatar className="size-8">
            <AvatarImage src={item.icon} alt="incoming-item-icon" />
          </Avatar>
        ) : null}
        <Typography variant="heading-5">{item.name}</Typography>
      </div>
      <Typography variant="base-s-regular">{item.summary}</Typography>
    </div>
  )
}
