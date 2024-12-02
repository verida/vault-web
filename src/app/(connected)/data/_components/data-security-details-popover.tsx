import { BadgeCheckIcon, DatabaseIcon, KeyRoundIcon } from "lucide-react"
import Link from "next/link"

import { Typography } from "@/components/typography"
import {
  SecurityDetailsPopover,
  SecurityDetailsPopoverBody,
  SecurityDetailsPopoverContent,
  SecurityDetailsPopoverDescription,
  SecurityDetailsPopoverFooter,
  SecurityDetailsPopoverHeader,
  SecurityDetailsPopoverTitle,
  SecurityDetailsPopoverTrigger,
  SecurityIcon,
} from "@/components/ui/security"

export type DataSecurityDetailsPopoverProps = React.ComponentProps<
  typeof SecurityDetailsPopoverTrigger
>

export function DataSecurityDetailsPopover(
  props: DataSecurityDetailsPopoverProps
) {
  const { ...triggerProps } = props

  return (
    <SecurityDetailsPopover>
      <SecurityDetailsPopoverTrigger {...triggerProps} />
      <SecurityDetailsPopoverContent>
        <SecurityDetailsPopoverHeader>
          <div className="flex min-w-0 flex-row items-center gap-2">
            <SecurityIcon className="size-5" />
            <SecurityDetailsPopoverTitle className="flex-1">
              Your data is protected
            </SecurityDetailsPopoverTitle>
          </div>
          <SecurityDetailsPopoverDescription>
            Your data is securely stored in your private space (Vault) on the
            Verida Network.
          </SecurityDetailsPopoverDescription>
        </SecurityDetailsPopoverHeader>
        <SecurityDetailsPopoverBody className="gap-4">
          <div className="flex items-start gap-3">
            <KeyRoundIcon className="size-4 shrink-0 text-status-secured-foreground" />
            <div className="flex flex-col gap-1">
              <Typography
                variant="heading-5"
                component="p"
                className="leading-5 sm:leading-5"
              >
                Encryption
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-regular">
                  Your data is specificaly encrypted with your own decentralized
                  identity.
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BadgeCheckIcon className="size-4 shrink-0 text-status-secured-foreground" />
            <div className="flex flex-col gap-1">
              <Typography
                variant="heading-5"
                component="p"
                className="leading-5 sm:leading-5"
              >
                Ownership
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-regular">
                  You are the owner of your data, you control who has access to
                  it.
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <DatabaseIcon className="size-4 shrink-0 text-status-secured-foreground" />
            <div className="flex flex-col gap-1">
              <Typography
                variant="heading-5"
                component="p"
                className="leading-5 sm:leading-5"
              >
                Isolation
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-regular">
                  Your data is completely isolated from other users on the
                  Verida Network.
                </Typography>
              </div>
            </div>
          </div>
        </SecurityDetailsPopoverBody>
        <SecurityDetailsPopoverFooter>
          <Link
            href="https://www.verida.network/data-security"
            target="_blank"
            className="text-muted-foreground underline"
          >
            <Typography variant="base-regular">
              Learn more about data security
            </Typography>
          </Link>
        </SecurityDetailsPopoverFooter>
      </SecurityDetailsPopoverContent>
    </SecurityDetailsPopover>
  )
}
DataSecurityDetailsPopover.displayName = "DataSecurityDetailsPopover"
