import {
  Loading,
  LoadingDescription,
  LoadingSpinner,
  LoadingTitle,
} from "@/components/ui/loading"
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
      <Loading>
        <LoadingSpinner />
        <LoadingTitle variant="heading-1">Connecting to Verida...</LoadingTitle>
        <LoadingDescription variant="base-l">
          Please wait while we establish a secure connection. This might take a
          moments.
        </LoadingDescription>
      </Loading>
    </div>
  )
}
