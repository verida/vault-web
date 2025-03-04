import { CpuIcon, DatabaseIcon } from "lucide-react"
import Link from "next/link"

import { Typography } from "@/components/typography"
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
import { getDataPageRoute } from "@/features/routes/utils"

export type ConnectionsSecurityDetailsDialogProps = React.ComponentProps<
  typeof SecurityDetailsDialogTrigger
>

export function ConnectionsSecurityDetailsDialog(
  props: ConnectionsSecurityDetailsDialogProps
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
              Your connections are secured
            </SecurityDetailsDialogTitle>
          </div>
          <SecurityDetailsDialogDescription>
            Verida Confidential Compute ensures your data is extracted from your
            platforms in a secured way.
          </SecurityDetailsDialogDescription>
        </SecurityDetailsDialogHeader>
        <SecurityDetailsDialogBody className="flex flex-col gap-4">
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
                  in a secure and isolated environment (TEE).
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
        </SecurityDetailsDialogBody>
        <SecurityDetailsDialogFooter>
          <Link
            href="https://docs.verida.ai/resources/privacy-and-security#confidential-compute"
            target="_blank"
            className="text-muted-foreground underline"
          >
            <Typography variant="base-regular">
              Learn more about Verida Confidential Compute
            </Typography>
          </Link>
        </SecurityDetailsDialogFooter>
      </SecurityDetailsDialogContent>
    </SecurityDetailsDialog>
  )
}
ConnectionsSecurityDetailsDialog.displayName =
  "ConnectionsSecurityDetailsDialog"
