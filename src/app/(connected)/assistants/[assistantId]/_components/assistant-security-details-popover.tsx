import { BrainCircuitIcon, DatabaseIcon } from "lucide-react"
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

export type AssistantSecurityDetailsPopoverProps = React.ComponentProps<
  typeof SecurityDetailsPopoverTrigger
>

export function AssistantSecurityDetailsPopover(
  props: AssistantSecurityDetailsPopoverProps
) {
  const { ...triggerProps } = props

  return (
    <SecurityDetailsPopover>
      <SecurityDetailsPopoverTrigger variant="warning" {...triggerProps} />
      <SecurityDetailsPopoverContent align="end">
        <SecurityDetailsPopoverHeader>
          <div className="flex min-w-0 flex-row items-center gap-2">
            <SecurityIcon className="size-5 text-status-warning" />
            <SecurityDetailsPopoverTitle className="flex-1 text-foreground">
              Privacy notice
            </SecurityDetailsPopoverTitle>
          </div>
          <SecurityDetailsPopoverDescription>
            We are actively building Verida Confidential Compute focused on
            security and privacy.
          </SecurityDetailsPopoverDescription>
          <SecurityDetailsPopoverDescription>
            During the{" "}
            <Typography variant="base-semibold" component="span">
              Alpha phase
            </Typography>
            , temporary solutions have been implemented for the AI processing
            using a third party platform. While not perfect, these solutions
            provide adequate protections for your data.
          </SecurityDetailsPopoverDescription>
        </SecurityDetailsPopoverHeader>
        <SecurityDetailsPopoverBody className="gap-4">
          <div className="flex items-start gap-3">
            <BrainCircuitIcon className="size-4 shrink-0 text-status-warning" />
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
                  Your requests are sent to a third-party platform. Your inputs
                  and the AI outputs are{" "}
                  <Typography variant="base-semibold" component="span">
                    not
                  </Typography>{" "}
                  stored.
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <DatabaseIcon className="size-4 shrink-0 text-status-warning" />
            <div className="flex flex-col gap-1">
              <Typography
                variant="heading-5"
                component="p"
                className="leading-5 sm:leading-5"
              >
                Data access
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-regular">
                  A subset of your data is sent to the third-party platform as
                  part of your requests. They are similarly{" "}
                  <Typography variant="base-semibold" component="span">
                    not
                  </Typography>{" "}
                  stored.
                </Typography>
              </div>
            </div>
          </div>
        </SecurityDetailsPopoverBody>
        <SecurityDetailsPopoverFooter>
          <Link
            href="https://developers.verida.network/apis/privacy-and-security#llm-privacy-alpha"
            target="_blank"
            className="text-muted-foreground underline"
          >
            <Typography variant="base-regular">
              Learn more about the AI privacy and security
            </Typography>
          </Link>
        </SecurityDetailsPopoverFooter>
      </SecurityDetailsPopoverContent>
    </SecurityDetailsPopover>
  )
}
AssistantSecurityDetailsPopover.displayName = "AssistantSecurityDetailsPopover"
