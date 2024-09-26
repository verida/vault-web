import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { cn } from "@/styles/utils"

export type RestrictedAccessPageContentProps = {
  isLoading: boolean
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">

export function RestrictedAccessPageContent(
  props: RestrictedAccessPageContentProps
) {
  const { isLoading, className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-8",
        className
      )}
      {...divProps}
    >
      {isLoading ? (
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle variant="heading-1">
            Checking your access...
          </LoadingBlockTitle>
          <LoadingBlockDescription variant="base-l">
            The Vault app is currently in limited access, please wait while we
            are checking your access to the application.
          </LoadingBlockDescription>
        </LoadingBlock>
      ) : (
        <ErrorBlock>
          <ErrorBlockTitle variant="heading-1">Limited Access</ErrorBlockTitle>
          <ErrorBlockDescription variant="base-l">
            You have been added to the wait list. You will be notified when your
            access is granted.
          </ErrorBlockDescription>
        </ErrorBlock>
      )}
    </div>
  )
}
