import { Spinner } from "@/components/spinner"
import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

type ConnectionLoadingProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
>

export function ConnectionLoading(props: ConnectionLoadingProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-8",
        className
      )}
      {...divProps}
    >
      <Spinner />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Typography variant="heading-1" className="text-center">
          Connecting to Verida...
        </Typography>
        <Typography variant="base-l" className="text-center">
          Please wait while we establish a secure connection. This might take a
          moments.
        </Typography>
      </div>
    </div>
  )
}
