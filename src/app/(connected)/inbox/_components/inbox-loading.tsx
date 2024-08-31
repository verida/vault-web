import { Spinner } from "@/components/spinner"
import { Typography } from "@/components/typography"

export type InboxLoadingProps = {
  title: string
  description: string
}

export function InboxLoading(props: InboxLoadingProps) {
  const { title, description } = props

  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6">
      <Spinner />
      <div className="space-y-2 text-center">
        <Typography variant="heading-4">{title}</Typography>
        <Typography variant="base-regular" className="text-muted-foreground">
          {description}
        </Typography>
      </div>
    </div>
  )
}
