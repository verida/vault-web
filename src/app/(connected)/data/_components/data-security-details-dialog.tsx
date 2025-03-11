import { BadgeCheckIcon, DatabaseIcon, KeyRoundIcon } from "lucide-react"
import Link from "next/link"

import {
  SecurityDetailsDialog,
  SecurityDetailsDialogBody,
  SecurityDetailsDialogContent,
  SecurityDetailsDialogDescription,
  SecurityDetailsDialogFooter,
  SecurityDetailsDialogHeader,
  SecurityDetailsDialogTitle,
  SecurityDetailsDialogTrigger,
  SecurityIcon,
} from "@/components/ui/security"
import { Typography } from "@/components/ui/typography"

export type DataSecurityDetailsDialogProps = React.ComponentProps<
  typeof SecurityDetailsDialogTrigger
>

export function DataSecurityDetailsDialog(
  props: DataSecurityDetailsDialogProps
) {
  const { ...triggerProps } = props

  return (
    <SecurityDetailsDialog>
      <SecurityDetailsDialogTrigger {...triggerProps} />
      <SecurityDetailsDialogContent>
        <SecurityDetailsDialogHeader>
          <div className="flex min-w-0 flex-row items-center gap-2">
            <SecurityIcon className="size-5" />
            <SecurityDetailsDialogTitle className="flex-1">
              Your data is protected
            </SecurityDetailsDialogTitle>
          </div>
          <SecurityDetailsDialogDescription>
            Your data is securely stored in your private space (Vault) on the
            Verida Network Confidential Storage.
          </SecurityDetailsDialogDescription>
        </SecurityDetailsDialogHeader>
        <SecurityDetailsDialogBody className="flex flex-col gap-4">
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
                  Your data is specifically encrypted with your own
                  decentralized identity.
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
                  it, if any.
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
                  Your data is fully isolated from other users on the Verida
                  Network.
                </Typography>
              </div>
            </div>
          </div>
        </SecurityDetailsDialogBody>
        <SecurityDetailsDialogFooter>
          <Link
            href="https://www.verida.network/data-security"
            target="_blank"
            className="text-muted-foreground underline"
          >
            <Typography variant="base-regular">
              Learn more about data security
            </Typography>
          </Link>
        </SecurityDetailsDialogFooter>
      </SecurityDetailsDialogContent>
    </SecurityDetailsDialog>
  )
}
DataSecurityDetailsDialog.displayName = "DataSecurityDetailsDialog"
