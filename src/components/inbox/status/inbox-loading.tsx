import { Spinner } from "@/components/spinner"
import { Typography } from "@/components/typography"

interface InboxLoadingProps {
  title: string
  description: string
}

export const InboxLoading: React.FC<InboxLoadingProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6">
      <Spinner />
      <div className="space-y-2 text-center">
        <Typography variant="heading-4">{title}</Typography>
        <Typography
          variant="base-regular"
          className="text-secondary-foreground"
        >
          {description}
        </Typography>
      </div>
    </div>
  )
}
