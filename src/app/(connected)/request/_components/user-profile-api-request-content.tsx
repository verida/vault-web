"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ComponentProps, useCallback, useMemo, useState } from "react"

import { Typography } from "@/components/typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MessageBlock, MessageBlockBody } from "@/components/ui/message-block"
import { Skeleton } from "@/components/ui/skeleton"
import { UserProfileApiRequest } from "@/features/requests/types"
import { getRootPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry/logger"
import { getUserProfile } from "@/features/user-ai-profile/utils"
import { getVeridaExplorerIdentityPageUrl } from "@/features/verida-explorer/utils"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { UserYourselfBadge } from "@/features/verida-profile/components/user-yourself-badge"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

const logger = Logger.create("requests")

interface UserProfileApiRequestContentProps {
  request: UserProfileApiRequest
}

type RequestProcessingStep =
  | "review-request"
  | "generating-profile"
  | "check-profile"
  | "sharing-profile"
  | "profile-shared"

export function UserProfileApiRequestContent(
  props: UserProfileApiRequestContentProps
) {
  const { request } = props

  const parsedEndpointUri = useMemo(() => {
    return new URL(request.endpointUri)
  }, [request.endpointUri])

  const [currentStep, setCurrentStep] =
    useState<RequestProcessingStep>("review-request")

  const { did, getAccountSessionToken } = useVerida()
  const { profile, isLoading } = useVeridaProfile({
    did: request.did,
  })

  const [generatedProfile, setGeneratedProfile] = useState<Record<
    string,
    unknown
  > | null>(null)

  const router = useRouter()

  const handleDeclineClick = useCallback(() => {
    router.replace(getRootPageRoute())
  }, [router])

  const handleGenerateProfileClick = useCallback(async () => {
    try {
      setCurrentStep("generating-profile")

      const sessionToken = await getAccountSessionToken()

      const profileResult = await getUserProfile({
        sessionToken: sessionToken,
        params: {
          ...request.profileParams,
          schema: request.profileJsonSchema,
        },
      })
      setGeneratedProfile(profileResult.response.output)

      setCurrentStep("check-profile")
    } catch (error) {
      logger.error(
        new Error("Error generating user AI profile", { cause: error })
      )
    }
  }, [getAccountSessionToken, request.profileParams, request.profileJsonSchema])

  return (
    <div className="flex flex-row justify-center">
      <Card className="flex w-full max-w-3xl flex-col">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle>User Profile Request</CardTitle>
          <CardDescription>
            Verida will build a profile based on the requested information and
            your personal data.
          </CardDescription>
          <CardDescription>
            You can check the generated profile before sharing it with the
            requester.
          </CardDescription>
          <Breadcrumb className="mt-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={cn(
                    currentStep === "review-request"
                      ? ""
                      : "text-muted-foreground"
                  )}
                >
                  Review request
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={cn(
                    currentStep === "check-profile"
                      ? ""
                      : "text-muted-foreground"
                  )}
                >
                  Check profile
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={cn(
                    currentStep === "profile-shared"
                      ? ""
                      : "text-muted-foreground"
                  )}
                >
                  Share
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
        <CardBody className="flex flex-col gap-6 p-6">
          <div className="flex flex-row items-start gap-2">
            <ProfileAvatar
              profile={profile}
              isLoading={isLoading}
              className="size-12"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-row gap-1.5">
                {!request.did || profile ? (
                  <>
                    <div
                      className={cn(
                        "min-w-0",
                        profile?.name ? "" : "italic text-muted-foreground"
                      )}
                    >
                      <Typography variant="heading-5" className="h-6 truncate">
                        {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
                      </Typography>
                    </div>
                  </>
                ) : (
                  <Skeleton className="my-1 h-4 w-36" />
                )}
                {did === request.did && (
                  <UserYourselfBadge className="self-start" />
                )}
              </div>
              {request.did ? (
                <Link
                  href={getVeridaExplorerIdentityPageUrl(request.did)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  <Typography variant="base-s-regular" className="truncate">
                    {request.did}
                  </Typography>
                </Link>
              ) : null}
            </div>
          </div>
          <MessageBlock>
            <div
              className={cn(
                request.purpose ? "" : "italic text-muted-foreground"
              )}
            >
              <MessageBlockBody>
                {request.purpose
                  ? `"${request.purpose}"`
                  : "No purpose provided. Be careful with sharing your data."}
              </MessageBlockBody>
            </div>
          </MessageBlock>
          {currentStep === "review-request" ||
          currentStep === "generating-profile" ? (
            <div className="flex flex-col gap-3">
              <div className="text-muted-foreground">
                <Typography variant="base-semibold">
                  Requested information
                </Typography>
              </div>
              <RequestedInformationCard request={request} />
            </div>
          ) : null}
          {currentStep === "check-profile" ||
          currentStep === "sharing-profile" ? (
            <div className="flex flex-col gap-3">
              <div className="text-muted-foreground">
                <Typography variant="base-semibold">Your profile</Typography>
              </div>
              <pre className="text-sm">
                <code className="font-mono whitespace-pre-wrap break-all">
                  {JSON.stringify(generatedProfile, null, 2)}
                </code>
              </pre>
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <div className="text-muted-foreground">
              <Typography variant="base-semibold">Shared to</Typography>
            </div>
            <Typography variant="base-regular" className="break-words">
              {parsedEndpointUri.origin}
            </Typography>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="request" className="border-b-0">
              <AccordionTrigger className="py-0 text-muted-foreground">
                <Typography variant="base-semibold">Full request</Typography>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-1">
                <pre className="text-sm">
                  <code className="font-mono whitespace-pre-wrap break-all">
                    {JSON.stringify(request, null, 2)}
                  </code>
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardBody>
        <CardFooter className="border-t p-6">
          <div className="flex w-full flex-col gap-3">
            <Alert variant="warning">
              <AlertDescription>
                {`Decline if you don't recognize this request`}
              </AlertDescription>
            </Alert>
            <div className="flex flex-row items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleDeclineClick}
                disabled={
                  currentStep === "generating-profile" ||
                  currentStep === "sharing-profile"
                }
              >
                {currentStep === "profile-shared" ? "Close" : "Decline"}
              </Button>
              {currentStep === "review-request" ||
              currentStep === "generating-profile" ? (
                <Button
                  onClick={handleGenerateProfileClick}
                  disabled={currentStep === "generating-profile"}
                >
                  Generate Profile
                </Button>
              ) : currentStep === "check-profile" ||
                currentStep === "sharing-profile" ? (
                <Button disabled={true}>Share Profile</Button>
              ) : null}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
UserProfileApiRequestContent.displayName = "UserProfileApiRequestContent"

interface RequestedInformationCardProps extends ComponentProps<typeof Card> {
  request: UserProfileApiRequest
}

function RequestedInformationCard(props: RequestedInformationCardProps) {
  const { request, className, ...cardProps } = props

  const parsedProfileSchemaUri = useMemo(() => {
    return new URL(request.profileJsonSchema)
  }, [request.profileJsonSchema])

  return (
    <Card
      className={cn("flex flex-col gap-6 bg-surface-active p-4", className)}
      {...cardProps}
    >
      <Link
        href={request.profileJsonSchema}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        <Typography variant="base-regular" className="break-words">
          {`${parsedProfileSchemaUri.origin}${parsedProfileSchemaUri.pathname}`}
        </Typography>
      </Link>
      <Alert variant={request.exposesUserData ? "error" : "warning"}>
        <AlertTitle>Privacy Notice</AlertTitle>
        <AlertDescription>
          {request.exposesUserData
            ? "The requester has self-attested that user data will be exposed to third-parties."
            : "The requester has self-attested that no user data will be exposed to third-parties."}
        </AlertDescription>
      </Alert>
    </Card>
  )
}
RequestedInformationCard.displayName = "RequestedInformationCard"
