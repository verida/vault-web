"use client"

import Image from "next/image"

// TODO: Rename the image with a generic name
import ErrorInboxImage from "@/assets/error-inbox.svg"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"

export type DataErrorProps = {
  description: string
  onClick?: () => void
}

export function DataError(props: DataErrorProps) {
  const { description, onClick } = props

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <Image
        src={ErrorInboxImage}
        width={121}
        height={140}
        alt="error"
        className="h-[105px] md:h-[140px]"
      />
      <Typography variant="heading-4">{description}</Typography>
      <Button variant="secondary" onClick={onClick}>
        Reload
      </Button>
    </div>
  )
}
