import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
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
        "flex h-full w-full flex-col items-center justify-center gap-8 p-4",
        className
      )}
      {...divProps}
    >
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle variant="heading-1">
          Connecting to Verida...
        </LoadingBlockTitle>
        <LoadingBlockDescription variant="base-l">
          Please wait while we establish a secure connection. This might take a
          moment.
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
