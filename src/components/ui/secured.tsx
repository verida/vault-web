import { LockIcon, ServerIcon, ShieldCheckIcon, ShieldIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/styles/utils"

export type SecuredBadgeProps = Omit<
  React.ComponentProps<typeof Badge>,
  "children" | "variant"
>

export function SecuredBadge(props: SecuredBadgeProps) {
  const { className, ...divProps } = props

  return (
    <Badge
      variant="success-reverse"
      className={cn("gap-1 px-1 py-1 sm:px-2 sm:py-1", className)}
      {...divProps}
    >
      <ShieldCheckIcon className="size-4" />
      <span className="sr-only sm:not-sr-only">Secured</span>
    </Badge>
  )
}
SecuredBadge.displayName = "SecuredBadge"

export function SecuredPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <SecuredBadge />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-20}
        collisionPadding={8}
        className="w-[calc(100vw-1rem)] max-w-sm"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <ShieldCheckIcon className="size-5" />
            Your Data is Protected
          </CardTitle>
          <CardDescription>
            Verida Vault ensures your data remains private and secure
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-start gap-3">
            <LockIcon className="mt-0.5 size-5 text-emerald-600" />
            <div>
              <h4 className="mb-1 font-medium leading-none">
                End-to-End Encryption
              </h4>
              <p className="text-sm text-muted-foreground">
                Your data is encrypted before leaving your device
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ServerIcon className="mt-0.5 size-5 text-emerald-600" />
            <div>
              <h4 className="mb-1 font-medium leading-none">
                Secure Processing
              </h4>
              <p className="text-sm text-muted-foreground">
                AI processing occurs in isolated, secure environments
              </p>
            </div>
          </div>
        </CardContent>
      </PopoverContent>
    </Popover>
  )
}
SecuredPopover.displayName = "SecuredPopover"
