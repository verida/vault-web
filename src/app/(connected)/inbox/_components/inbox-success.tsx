import Image from "next/image"

import SuccessShareImage from "@/assets/success.svg"
import { Typography } from "@/components/typography"

export type InboxSuccessProps = {
  title: string
  description: React.ReactNode
}

export function InboxSuccess(props: InboxSuccessProps) {
  const { title, description } = props

  return (
    <div className="flex flex-grow flex-col items-center justify-center text-center">
      <Image
        src={SuccessShareImage}
        width={120}
        height={140}
        alt="success"
        className="h-[105px] md:h-[140px]"
      />
      <Typography variant="heading-4" className="mt-6">
        {title}
      </Typography>
      <Typography className="mt-2 text-secondary-foreground">
        {description}
      </Typography>
    </div>
  )
}
