"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback } from "react"

import { Typography } from "@/components/typography"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VeridaIdentityDropdownMenu } from "@/components/verida/verida-identity-dropdown-menu"
import { ALL_DATABASE_DEFS } from "@/features/data/constants"
import { useVeridaOauth } from "@/features/verida-oauth/hooks/use-verida-oauth"
import { VeridaOauthScope } from "@/features/verida-oauth/types"

type OAuthConsentCardProps = React.ComponentProps<"div">

export function OAuthConsentCard(props: OAuthConsentCardProps) {
  const { ...divProps } = props

  const { payload, handleAllow, handleDeny } = useVeridaOauth()

  // TODO: Handle case where no payload is available

  const { name, url, scopes } = payload

  const formatScope = useCallback((scope: VeridaOauthScope) => {
    const databaseDef = ALL_DATABASE_DEFS.find(
      (db) => db.databaseVaultName === scope.database
    )

    return (
      <Typography variant="base-regular">
        <span className="capitalize">{scope.operation}</span>{" "}
        {scope.operation === "write" ? "on your" : "your"}{" "}
        <span className="font-semibold lowercase">
          {databaseDef?.titlePlural || scope.database}
        </span>
      </Typography>
    )
  }, [])

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex shrink-0 flex-row items-center">
            <Image
              src="/logo.svg"
              alt="Verida Vault Logo"
              height={32}
              width={95}
            />
          </div>
          <VeridaIdentityDropdownMenu
            keepExpanded
            hideDisconnect={false}
            hideFeedback={false}
          />
        </div>
        <Card className="flex h-full flex-col gap-6 p-6">
          <CardHeader className="shrink-0 p-0">
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
                <Typography variant="base-regular">
                  {
                    // TODO: Display punnycode of the URL
                    url
                  }
                </Typography>
              </Link>
            </CardDescription>
          </CardHeader>
          <CardBody className="flex flex-1 flex-col gap-4 overflow-y-auto p-0">
            {scopes.length > 0 ? (
              <>
                <Typography variant="base-regular">
                  By allowing it,{" "}
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {name}
                  </Link>{" "}
                  will be able to:
                </Typography>
                <ul>
                  {scopes.map((scope, index) => (
                    <li key={index}>
                      <Typography>{formatScope(scope)}</Typography>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Typography
                variant="base-regular"
                className="text-muted-foreground"
              >
                No access requested
              </Typography>
            )}
            <div>
              <Alert variant="warning">
                <AlertTitle>Privacy Notice</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  {name} will have access to your personal data.
                </AlertDescription>
                <AlertDescription className="text-xs text-muted-foreground">
                  Make sure you trust the application before allowing the
                  access.
                </AlertDescription>
              </Alert>
            </div>
          </CardBody>
          <CardFooter className="shrink-0 justify-between p-0">
            <Button variant="outline" onClick={handleDeny}>
              Deny
            </Button>
            <Button variant="primary" onClick={handleAllow}>
              Allow
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
OAuthConsentCard.displayName = "OAuthConsentCard"
