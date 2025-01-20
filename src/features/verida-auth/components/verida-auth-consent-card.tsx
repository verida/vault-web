"use client"

import Link from "next/link"
import { useCallback, useMemo, useState } from "react"

import { Typography } from "@/components/typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { Logger } from "@/features/telemetry/logger"
import { useAllowVeridaAuthRequest } from "@/features/verida-auth/hooks/use-allow-verida-auth-request"
import { useDenyVeridaAuthRequest } from "@/features/verida-auth/hooks/use-deny-verida-auth-request"
import { useResolvedVeridaAuthScopes } from "@/features/verida-auth/hooks/use-resolved-verida-auth-scopes"
import { VeridaAuthRequestPayload } from "@/features/verida-auth/types"
import { getVeridaExplorerIdentityPageUrl } from "@/features/verida-explorer/utils"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { cn } from "@/styles/utils"

const logger = Logger.create("verida-auth")

export interface VeridaAuthConsentCardProps
  extends React.ComponentProps<typeof Card> {
  payload: VeridaAuthRequestPayload
}

export function VeridaAuthConsentCard(props: VeridaAuthConsentCardProps) {
  const { payload, className, ...cardProps } = props

  const { appDID, scopes, redirectUrl } = payload

  const resolvedRedirectUrl = useMemo(() => {
    return new URL(redirectUrl)
  }, [redirectUrl])

  const { profile, isLoading } = useVeridaProfile({
    did: appDID,
  })

  const profileWebsiteUrl = useMemo(() => {
    if (profile?.website) {
      return new URL(profile.website)
    }

    return null
  }, [profile])

  const { resolvedScopes } = useResolvedVeridaAuthScopes(scopes)

  const apiScopes = useMemo(() => {
    return resolvedScopes?.filter((scope) => scope.type === "api")
  }, [resolvedScopes])

  const dataScopes = useMemo(() => {
    return resolvedScopes?.filter((scope) => scope.type === "data")
  }, [resolvedScopes])

  const unknownScopes = useMemo(() => {
    return resolvedScopes?.filter((scope) => scope.type === "unknown")
  }, [resolvedScopes])

  const { deny } = useDenyVeridaAuthRequest({ payload })
  const { allow } = useAllowVeridaAuthRequest({ payload })

  const [isAllowing, setIsAllowing] = useState(false)

  const handleDenyClick = useCallback(() => {
    try {
      deny()
    } catch (error) {
      logger.error(error)
    }
  }, [deny])

  const handleAllowClick = useCallback(async () => {
    try {
      setIsAllowing(true)
      await allow()
    } catch (error) {
      logger.error(error)
    }
  }, [allow])

  return (
    <Card className={cn("h-full", className)} {...cardProps}>
      <CardHeader className="shrink-0 gap-3">
        <div className="flex flex-row items-center gap-2">
          <ProfileAvatar
            profile={profile}
            isLoading={isLoading}
            className="size-12"
          />
          <CardTitle>
            <span
              className={profile?.name ? "" : "italic text-muted-foreground"}
            >
              {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
            </span>{" "}
            wants to access your Verida Vault
          </CardTitle>
        </div>
        <div className="flex flex-col gap-1">
          <CardDescription className="truncate">
            <Link
              href={getVeridaExplorerIdentityPageUrl(appDID)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {appDID}
            </Link>
          </CardDescription>
          <CardDescription className="truncate">
            <Link
              href={
                profileWebsiteUrl
                  ? profileWebsiteUrl.origin
                  : resolvedRedirectUrl.origin
              }
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {profileWebsiteUrl
                ? profileWebsiteUrl.origin
                : resolvedRedirectUrl.origin}
            </Link>
          </CardDescription>
        </div>
      </CardHeader>
      {isAllowing ? (
        <CardBody className="flex-1 py-3">
          <LoadingBlock>
            <LoadingBlockSpinner />
            <LoadingBlockTitle>Allowing access</LoadingBlockTitle>
            <LoadingBlockDescription>
              Please wait a moment while we allow the access
            </LoadingBlockDescription>
          </LoadingBlock>
        </CardBody>
      ) : (
        <CardBody className="flex flex-1 flex-col gap-4 overflow-y-auto">
          {resolvedScopes && resolvedScopes.length > 0 ? (
            <>
              <Typography variant="base-regular">
                {`By allowing it, ${profile?.name || "this application"} will be able to:`}
              </Typography>
              <Accordion
                type="multiple"
                defaultValue={["data-scopes", "api-scopes"]}
              >
                {dataScopes && dataScopes.length > 0 ? (
                  <>
                    <AccordionItem value="data-scopes">
                      <AccordionTrigger>Data</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-inside list-disc">
                          {dataScopes.map((scope, index) => (
                            <li key={index}>
                              <Typography
                                variant="base-regular"
                                component="span"
                              >
                                {scope.permissions?.map(
                                  (permission, index, array) => {
                                    const capitalizedPermission =
                                      index === 0
                                        ? permission.charAt(0).toUpperCase() +
                                          permission.slice(1)
                                        : permission

                                    const separator =
                                      array.length <= 1
                                        ? ""
                                        : index === array.length - 1
                                          ? ""
                                          : index === array.length - 2
                                            ? " and "
                                            : ", "

                                    return (
                                      <span
                                        key={index}
                                        className="font-semibold"
                                      >
                                        {capitalizedPermission}
                                        {separator}
                                      </span>
                                    )
                                  }
                                )}{" "}
                                your{" "}
                                <span className="font-semibold">
                                  {scope.name}
                                </span>{" "}
                                database ({scope.description})
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                ) : null}
                {apiScopes && apiScopes.length > 0 ? (
                  <>
                    <AccordionItem value="api-scopes">
                      <AccordionTrigger>Actions</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-inside list-disc">
                          {apiScopes.map((scope, index) => (
                            <li key={index}>
                              <Typography
                                variant="base-regular"
                                component="span"
                              >
                                {scope.description}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                ) : null}
                {unknownScopes && unknownScopes.length > 0 ? (
                  <>
                    <AccordionItem value="unknown-scopes">
                      <AccordionTrigger>Other</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-inside list-disc">
                          {unknownScopes.map((scope, index) => (
                            <li key={index}>
                              <Typography
                                variant="base-regular"
                                component="span"
                              >
                                <span className="font-semibold">
                                  {scope.permissions?.join(", ")}
                                </span>{" "}
                                your{" "}
                                <span className="font-semibold">
                                  {scope.name}
                                </span>
                                ({scope.description})
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                ) : null}
              </Accordion>
            </>
          ) : (
            <div className="text-muted-foreground">
              <Typography variant="base-regular">
                No access requested
              </Typography>
            </div>
          )}
          <div className="text-muted-foreground">
            <Typography variant="base-s-regular" className="line-clamp-2">
              {`You will be redirected to: ${resolvedRedirectUrl.origin}`}
            </Typography>
          </div>
          <div>
            <Alert variant="warning">
              <AlertTitle>Privacy Notice</AlertTitle>
              <AlertDescription className="text-xs text-muted-foreground">
                {profile?.name || "This application"} will have access to your
                personal data.
              </AlertDescription>
              <AlertDescription className="text-xs text-muted-foreground">
                Make sure you trust the application before allowing the access.
              </AlertDescription>
            </Alert>
          </div>
        </CardBody>
      )}
      <CardFooter className="flex shrink-0 flex-row items-center justify-end gap-4">
        <Button
          variant="outline-destructive"
          onClick={handleDenyClick}
          disabled={isAllowing}
          className="w-full sm:w-fit"
        >
          Deny
        </Button>
        <Button
          variant="primary"
          onClick={handleAllowClick}
          disabled={isAllowing}
          className="w-full sm:w-fit"
        >
          Allow
        </Button>
      </CardFooter>
    </Card>
  )
}
VeridaAuthConsentCard.displayName = "VeridaAuthConsentCard"
