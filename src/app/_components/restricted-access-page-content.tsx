import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { cn } from "@/styles/utils"

export type RestrictedAccessPageContentProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
>

export function RestrictedAccessPageContent(
  props: RestrictedAccessPageContentProps
) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-8",
        className
      )}
      {...divProps}
    >
      <ErrorBlock>
        <ErrorBlockTitle variant="heading-1">Limited Access</ErrorBlockTitle>
        <ErrorBlockDescription variant="base-l">
          You have been added to the wait list. You will be notified when the
          access is granted.
        </ErrorBlockDescription>
      </ErrorBlock>
    </div>
  )
}
