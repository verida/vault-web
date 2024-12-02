import { CpuIcon, DatabaseIcon } from "lucide-react"
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
import { getDataPageRoute } from "@/features/routes/utils"

export type ConnectionsSecurityDetailsPopoverProps = React.ComponentProps<
  typeof SecurityDetailsPopoverTrigger
>

export function ConnectionsSecurityDetailsPopover(
  props: ConnectionsSecurityDetailsPopoverProps
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
              Your connections are secured
            </SecurityDetailsPopoverTitle>
          </div>
          <SecurityDetailsPopoverDescription>
            The Verida Private Data Bridge ensures your data is securely
            extracted from your platforms.
          </SecurityDetailsPopoverDescription>
        </SecurityDetailsPopoverHeader>
        <SecurityDetailsPopoverBody className="gap-4">
          <div className="flex items-start gap-3">
            <CpuIcon className="size-4 shrink-0 text-status-secured-foreground" />
            <div className="flex flex-col gap-1">
              <Typography
                variant="heading-5"
                component="p"
                className="leading-5 sm:leading-5"
              >
                Secure processing
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-regular">
                  The connection and synchronization of your data is performed
                  in a secure and isolated environment.
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
                Secure storage
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-regular">
                  Your data is stored in your private space (Vault) on the
                  Verida Network.{" "}
                  <Link href={getDataPageRoute()} className="underline">
                    Go to your Data
                  </Link>
                </Typography>
              </div>
            </div>
          </div>
        </SecurityDetailsPopoverBody>
        <SecurityDetailsPopoverFooter>
          <Link
            href="https://developers.verida.network/private-data-bridge/introduction"
            target="_blank"
            className="text-muted-foreground underline"
          >
            <Typography variant="base-regular">
              Learn more about Verida Private Data Bridge
            </Typography>
          </Link>
        </SecurityDetailsPopoverFooter>
      </SecurityDetailsPopoverContent>
    </SecurityDetailsPopover>
  )
}
ConnectionsSecurityDetailsPopover.displayName =
  "ConnectionsSecurityDetailsPopover"
