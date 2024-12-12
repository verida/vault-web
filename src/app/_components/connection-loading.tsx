import { VeridaConnectionLoading } from "@/components/verida/verida-connection-loading"
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
      <VeridaConnectionLoading />
    </div>
  )
}
