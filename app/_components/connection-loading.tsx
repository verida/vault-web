import { Spinner } from "@/components/spinner"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

type ConnectionLoadingProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
>

export function ConnectionLoading(props: ConnectionLoadingProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "container flex h-screen min-h-screen w-full flex-col items-center justify-center",
        className
      )}
      {...divProps}
    >
      <Spinner />
      <Typography variant="heading-1" className="mt-8 text-center">
        Connecting to Verida...
      </Typography>
      <Typography className="mt-4 text-center">
        Please wait while we establish a secure connection. This might take a
        few moments.
      </Typography>
    </div>
  )
}
