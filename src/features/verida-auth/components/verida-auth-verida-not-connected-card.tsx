"use client"

import Link from "next/link"
import { type ComponentProps } from "react"

import { Card, CardBody } from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import { VeridaConnectionOptions } from "@/components/verida/verida-connection-options"
import { VeridaAuthCardHeader } from "@/features/verida-auth/components/verida-auth-card-header"
import type { ValidVeridaAuthRequest } from "@/features/verida-auth/types"
import { cn } from "@/styles/utils"

export interface VeridaAuthVeridaNotConnectedCardProps
  extends ComponentProps<typeof Card> {
  request: ValidVeridaAuthRequest
}

export function VeridaAuthVeridaNotConnectedCard(
  props: VeridaAuthVeridaNotConnectedCardProps
) {
  const { request, className, ...cardProps } = props

  return (
    <Card className={cn("", className)} {...cardProps}>
      <VeridaAuthCardHeader request={request} className="shrink-0" />
      <CardBody className="flex-1 overflow-y-auto pt-4 sm:pt-8">
        <div className="flex flex-col items-center gap-6">
          <Typography variant="heading-4" component="p">
            You are not connected to your Verida Vault
          </Typography>
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Typography>
              The Verida Vault allows you to extract your emails, messages and
              other personal data to securely and privately store them on the
              Verida Network and use them in AI applications.
            </Typography>
            <Typography>
              Connect to your Verida Vault using your Verida Wallet.
            </Typography>
            <VeridaConnectionOptions />
          </div>
          <div className="text-muted-foreground">
            <Typography>
              Learn more about{" "}
              <Link
                href="https://www.verida.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Verida Network
              </Link>
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
VeridaAuthVeridaNotConnectedCard.displayName =
  "VeridaAuthVeridaNotConnectedCard"
