import { BrainCircuitIcon, DatabaseIcon } from "lucide-react"
import Link from "next/link"

import { Typography } from "@/components/typography"
import {
  SecurityDetailsPopover,
  SecurityDetailsPopoverBody,
  SecurityDetailsPopoverContent,
  SecurityDetailsPopoverDescription,
  SecurityDetailsPopoverHeader,
  SecurityDetailsPopoverTitle,
  SecurityDetailsPopoverTrigger,
  SecurityIcon,
} from "@/components/ui/security"
import { getDataPageRoute } from "@/features/routes/utils"

export type AssistantSecurityDetailsPopoverProps = React.ComponentProps<
  typeof SecurityDetailsPopoverTrigger
>

export function AssistantSecurityDetailsPopover(
  props: AssistantSecurityDetailsPopoverProps
) {
  const { ...triggerProps } = props

  return (
    <SecurityDetailsPopover>
      <SecurityDetailsPopoverTrigger {...triggerProps} />
      <SecurityDetailsPopoverContent align="end">
        <SecurityDetailsPopoverHeader>
          <div className="flex min-w-0 flex-row items-center gap-2">
            <SecurityIcon className="size-5" />
            <SecurityDetailsPopoverTitle className="flex-1">
              Your privacy is respected
            </SecurityDetailsPopoverTitle>
          </div>
          <SecurityDetailsPopoverDescription>
            Verida Vault ensures your data remains private and secure.
          </SecurityDetailsPopoverDescription>
        </SecurityDetailsPopoverHeader>
        <SecurityDetailsPopoverBody className="gap-4">
          <div className="flex items-start gap-3">
            <DatabaseIcon className="size-4 shrink-0 text-status-secured-foreground" />
            <div className="flex flex-col gap-1">
              <Typography
                variant="heading-5"
                component="p"
                className="leading-5 sm:leading-5"
              >
                Secure access
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-regular">
                  Your data is accesssed from{" "}
                  <Link href={getDataPageRoute()} className="underline">
                    your Vault
                  </Link>{" "}
                  in a secure and isolated environment.
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BrainCircuitIcon className="size-4 shrink-0 text-status-secured-foreground" />
            <div className="flex flex-col gap-1">
              <Typography
                variant="heading-5"
                component="p"
                className="leading-5 sm:leading-5"
              >
                AI Processing
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-regular">
                  The security and privacy of your data is respected when
                  processed by our AI models.
                </Typography>
              </div>
            </div>
          </div>
        </SecurityDetailsPopoverBody>
      </SecurityDetailsPopoverContent>
    </SecurityDetailsPopover>
  )
}
AssistantSecurityDetailsPopover.displayName = "AssistantSecurityDetailsPopover"
