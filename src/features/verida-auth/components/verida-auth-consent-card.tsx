"use client"

import Link from "next/link"
import { Fragment, useCallback, useMemo, useState } from "react"

import { Typography } from "@/components/typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardBody, CardFooter } from "@/components/ui/card"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import {
  SuccessBlock,
  SuccessBlockDescription,
  SuccessBlockImage,
  SuccessBlockTitle,
} from "@/components/ui/success"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Logger } from "@/features/telemetry/logger"
import { VeridaAuthCardHeader } from "@/features/verida-auth/components/verida-auth-card-header"
import { VeridaAuthConsentError } from "@/features/verida-auth/components/verida-auth-consent-error"
import { useAllowVeridaAuthRequest } from "@/features/verida-auth/hooks/use-allow-verida-auth-request"
import { ValidVeridaAuthRequest } from "@/features/verida-auth/types"
import {
  buildDenyRequestRedirectUrl,
  buildErrorRedirectUrl,
} from "@/features/verida-auth/utils"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { cn } from "@/styles/utils"

const logger = Logger.create("verida-auth")

export interface VeridaAuthConsentCardProps
  extends React.ComponentProps<typeof Card> {
  request: ValidVeridaAuthRequest
}

export function VeridaAuthConsentCard(props: VeridaAuthConsentCardProps) {
  const { request, className, ...cardProps } = props

  const { payload, resolvedValidScopes } = request

  const resolvedRedirectUrl = useMemo(() => {
    return new URL(payload.redirectUrl)
  }, [payload.redirectUrl])

  const { profile } = useVeridaProfile({
    did: payload.appDID,
  })

  const apiScopes = useMemo(() => {
    return resolvedValidScopes?.filter((scope) => scope.type === "api")
  }, [resolvedValidScopes])

  const dataScopes = useMemo(() => {
    return resolvedValidScopes?.filter((scope) => scope.type === "data")
  }, [resolvedValidScopes])

  const unknownScopes = useMemo(() => {
    return resolvedValidScopes?.filter((scope) => scope.type === "unknown")
  }, [resolvedValidScopes])

  const { allow } = useAllowVeridaAuthRequest({ payload })

  const [isAllowing, setIsAllowing] = useState(false)
  const [errorRedirectUrl, setErrorRedirectUrl] = useState<string | null>(null)
  const [successRedirectUrl, setSuccessRedirectUrl] = useState<URL | null>(null)

  const handleDenyClick = useCallback(() => {
    try {
      logger.info("Denying Auth request")
      const redirectUrl = buildDenyRequestRedirectUrl(payload)
      window.location.href = redirectUrl
    } catch (error) {
      logger.error(error)
    }
  }, [payload])

  const handleAllowClick = useCallback(async () => {
    try {
      setIsAllowing(true)

      const { redirectUrl } = await allow()

      const url = new URL(redirectUrl)
      setSuccessRedirectUrl(url)

      window.location.href = redirectUrl // Redirect directly
    } catch (error) {
      logger.error(error)

      const redirectUrl = buildErrorRedirectUrl(payload)
      setErrorRedirectUrl(redirectUrl)
    } finally {
      setIsAllowing(false)
    }
  }, [allow, payload])

  return (
    <Card className={cn("", className)} {...cardProps}>
      <VeridaAuthCardHeader request={request} className="shrink-0" />
      <CardBody className="flex-1 overflow-y-auto">
        {isAllowing ? (
          <LoadingBlock className="my-3">
            <LoadingBlockSpinner />
            <LoadingBlockTitle>Allowing access</LoadingBlockTitle>
            <LoadingBlockDescription>
              Please wait a moment while we allow the access
            </LoadingBlockDescription>
          </LoadingBlock>
        ) : errorRedirectUrl ? (
          <VeridaAuthConsentError
            redirectUrl={errorRedirectUrl}
            className="my-3"
          />
        ) : successRedirectUrl ? (
          <SuccessBlock className="my-3">
            <SuccessBlockImage />
            <SuccessBlockTitle>Access Allowed</SuccessBlockTitle>
            <SuccessBlockDescription>
              You will be redirected to{" "}
              <Link
                href={successRedirectUrl.toString()}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {successRedirectUrl.origin}
              </Link>{" "}
              shortly
            </SuccessBlockDescription>
          </SuccessBlock>
        ) : (
          <div className="flex h-full flex-col gap-4">
            {resolvedValidScopes && resolvedValidScopes.length > 0 ? (
              <>
                <Typography variant="base-regular">
                  {`By allowing it, ${profile?.name || "this application"} will be able to:`}
                </Typography>
                <Accordion
                  type="multiple"
                  defaultValue={["data-scopes", "api-scopes"]}
                >
                  {dataScopes && dataScopes.length > 0 ? (
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
                                    const separator =
                                      array.length <= 1
                                        ? ""
                                        : index === array.length - 1
                                          ? ""
                                          : index === array.length - 2
                                            ? " and "
                                            : ", "

                                    return (
                                      <Fragment key={index}>
                                        <span
                                          className={cn(
                                            "font-semibold",
                                            index === 0 ? "capitalize" : ""
                                          )}
                                        >
                                          {permission}
                                        </span>
                                        {separator}
                                      </Fragment>
                                    )
                                  }
                                )}{" "}
                                in your{" "}
                                {scope.description ? (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <span className="font-semibold lowercase">
                                        {scope.namePlural || scope.name || ""}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {scope.description}
                                    </TooltipContent>
                                  </Tooltip>
                                ) : (
                                  <span className="font-semibold lowercase">
                                    {scope.namePlural || scope.name || ""}
                                  </span>
                                )}{" "}
                                database
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : null}
                  {apiScopes && apiScopes.length > 0 ? (
                    <AccordionItem value="api-scopes">
                      <AccordionTrigger>Operations</AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2">
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
                        {request.payload.payer === "app" ? (
                          <Alert variant="info">
                            <AlertDescription className="text-muted-foreground">
                              {`This application subsidizes their usage of the
                              Verida Network. You won't be charged for it.`}
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert variant="warning">
                            <AlertDescription className="text-muted-foreground">
                              This application does not subsidize their usage of
                              the Verida Network. This cost will incur to your
                              account.
                            </AlertDescription>
                          </Alert>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ) : null}
                  {unknownScopes && unknownScopes.length > 0 ? (
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
            <div className="flex flex-col gap-2">
              <Alert variant="warning">
                <AlertTitle>Privacy Notice</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  {profile?.name || "This application"} will have access to your
                  personal data.
                </AlertDescription>
                <AlertDescription className="text-xs text-muted-foreground">
                  Make sure you trust the application before allowing the
                  access.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}
      </CardBody>
      {errorRedirectUrl || successRedirectUrl ? null : (
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
      )}
    </Card>
  )
}
VeridaAuthConsentCard.displayName = "VeridaAuthConsentCard"
