import Image from "next/image"

import { Close } from "@/components/icons/close"
import { Typography } from "@/components/typography"

export type ChipProps = {
  id: string
  icon: string
  text: string
  onClose?: (id: string) => void
}

// TODO: Rework the Chip component with variants
export function Chip(props: ChipProps) {
  const { id, icon, text, onClose } = props

  return (
    <div className="flex items-center gap-2 rounded-full bg-primary p-1">
      <Image
        src={icon}
        alt=""
        width="24"
        height="24"
        className="rounded-full bg-surface"
      />
      <Typography variant="base-s-regular" className="text-primary-foreground">
        {text}
      </Typography>
      {!!onClose && (
        <Close
          className="mr-1 h-4 w-4 cursor-pointer text-primary-foreground"
          onClick={() => onClose(id)}
        />
      )}
    </div>
  )
}
