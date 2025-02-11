"use client"

import Link from "next/link"

import { Card, CardBody } from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { VeridaAuthCardHeader } from "@/features/verida-auth/components/verida-auth-card-header"
import { ValidVeridaAuthRequest } from "@/features/verida-auth/types"
import { cn } from "@/styles/utils"

export interface VeridaAuthVeridaNotConnectedCardProps
  extends React.ComponentProps<typeof Card> {
  request: ValidVeridaAuthRequest
}

export function VeridaAuthVeridaNotConnectedCard(
  props: VeridaAuthVeridaNotConnectedCardProps
) {
  const { request, className, ...cardProps } = props

  return (
    <Card className={cn("", className)} {...cardProps}>
      <VeridaAuthCardHeader request={request} className="shrink-0" />
      <CardBody className="flex flex-1 flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          <ErrorBlock className="my-8">
            <ErrorBlockTitle variant="heading-4" component="p">
              You are not connected
            </ErrorBlockTitle>
            <ErrorBlockDescription>
              Learn more about how the Verida Network helps you take back
              control of your personal data.
            </ErrorBlockDescription>
            <ErrorBlockDescription>
              Check{" "}
              <Link
                href="https://www.verida.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                verida.network
              </Link>
            </ErrorBlockDescription>
          </ErrorBlock>
          <VeridaConnectButton label="Connect with Verida" className="w-fit" />
        </div>
      </CardBody>
    </Card>
  )
}
VeridaAuthVeridaNotConnectedCard.displayName =
  "VeridaAuthVeridaNotConnectedCard"
