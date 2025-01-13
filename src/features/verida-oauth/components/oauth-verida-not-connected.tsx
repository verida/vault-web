"use client"

import Link from "next/link"

import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { useVeridaOauth } from "@/features/verida-oauth/hooks/use-verida-oauth"
import { cn } from "@/styles/utils"

type OAuthVeridaNotConnectedProps = React.ComponentProps<typeof Card>

export function OAuthVeridaNotConnected(props: OAuthVeridaNotConnectedProps) {
  const { className, ...cardProps } = props

  const { payload } = useVeridaOauth()

  // TODO: Handle case where no payload is available

  const { name, url } = payload

  return (
    <Card className={cn("h-full", className)} {...cardProps}>
      <CardHeader className="shrink-0">
        <CardTitle>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {name}
          </Link>{" "}
          wants to access your Verida Vault
        </CardTitle>
        <CardDescription>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {`${url.protocol}//${url.hostname}`}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardBody className="flex flex-1 flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <ErrorBlock>
            <ErrorBlockTitle variant="heading-5">
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
            <VeridaConnectButton label="Connect with Verida" />
          </ErrorBlock>
        </div>
      </CardBody>
    </Card>
  )
}
OAuthVeridaNotConnected.displayName = "OAuthVeridaNotConnected"
