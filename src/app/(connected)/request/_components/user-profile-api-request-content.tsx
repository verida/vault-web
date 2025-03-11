"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ComponentProps, useCallback, useMemo, useState } from "react"

import { RequestHeader } from "@/app/(connected)/request/_components/request-header"
import { RequestProcessingStepBreadcrumb } from "@/app/(connected)/request/_components/request-processing-step-breadcrumb"
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
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
} from "@/components/ui/loading"
import { MessageBlock, MessageBlockBody } from "@/components/ui/message-block"
import { Skeleton } from "@/components/ui/skeleton"
import {
  SuccessBlock,
  SuccessBlockDescription,
  SuccessBlockImage,
} from "@/components/ui/success"
import { Typography } from "@/components/ui/typography"
import { UserProfileApiRequest } from "@/features/requests/types"
import { acceptUserProfileApiRequest } from "@/features/requests/utils"
import { getRootPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry/logger"
import { getUserProfile } from "@/features/user-ai-profile/utils"
import { useDataSchema } from "@/features/verida-data-schemas/hooks/use-data-schema"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

const logger = Logger.create("requests")

export type UserProfileApiRequestContentProps = {
  request: UserProfileApiRequest
}

type RequestProcessingStep =
  | "review-request"
  | "generating-profile"
  | "error-generating-profile"
  | "check-profile"
  | "sharing-profile"
  | "error-sharing-profile"
  | "profile-shared"

export function UserProfileApiRequestContent(
  props: UserProfileApiRequestContentProps
) {
  const { request } = props

  const parsedEndpointUrl = useMemo(() => {
    return new URL(request.endpointUrl)
  }, [request.endpointUrl])

  const [currentStep, setCurrentStep] =
    useState<RequestProcessingStep>("review-request")

  const { getAccountSessionToken } = useVerida()

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
          schema: request.profileJsonSchemaUrl,
        },
      })
      setGeneratedProfile(profileResult.response.output)

      setCurrentStep("check-profile")
    } catch (error) {
      setCurrentStep("error-generating-profile")
      logger.error(
        new Error("Error generating user AI profile", { cause: error })
      )
    }
  }, [
    getAccountSessionToken,
    request.profileParams,
    request.profileJsonSchemaUrl,
  ])

  const handleShareProfileClick = useCallback(async () => {
    if (!generatedProfile) {
      return
    }

    setCurrentStep("sharing-profile")

    try {
      await acceptUserProfileApiRequest(request, generatedProfile)

      setCurrentStep("profile-shared")
    } catch (error) {
      // Not logging the error because we do not control the endpoint
      logger.warn("Error while sharing the profile", {
        error,
      })

      setCurrentStep("error-sharing-profile")
    }
  }, [generatedProfile, request])

  return (
    <div className="flex flex-row justify-center">
      <Card className="w-full max-w-3xl px-0">
        <CardHeader className="border-b px-6 pb-4">
          <CardTitle>User Profile Request</CardTitle>
          <CardDescription>
            Verida will build a profile based on the requested information and
            your personal data.
          </CardDescription>
          <CardDescription>
            You can check the generated profile before sharing it with the
            requester.
          </CardDescription>
          <RequestProcessingStepBreadcrumb
            className="mt-3"
            steps={[
              {
                name: "Review request",
                current: currentStep === "review-request",
              },
              {
                name: "Check profile",
                current: currentStep === "check-profile",
              },
              { name: "Share", current: currentStep === "profile-shared" },
            ]}
          />
        </CardHeader>
        <CardBody className="flex flex-col gap-6 px-6">
          <RequestHeader requesterDid={request.did} />
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
          {currentStep === "review-request" ? (
            <div className="flex flex-col gap-3">
              <div className="text-muted-foreground">
                <Typography variant="base-semibold">
                  Requested information
                </Typography>
              </div>
              <RequestedInformationCard request={request} />
            </div>
          ) : null}
          {currentStep === "generating-profile" ||
          currentStep === "error-generating-profile" ||
          currentStep === "check-profile" ? (
            <div className="flex flex-col gap-3">
              <div className="text-muted-foreground">
                <Typography variant="base-semibold">Your profile</Typography>
              </div>
              <GeneratedProfileCard
                request={request}
                generatedProfile={generatedProfile}
                isGenerating={currentStep === "generating-profile"}
              />
            </div>
          ) : null}
          {currentStep === "sharing-profile" ? (
            <LoadingBlock className="my-4">
              <LoadingBlockSpinner />
              <LoadingBlockDescription>
                Sharing your profile to the requester
              </LoadingBlockDescription>
            </LoadingBlock>
          ) : null}
          {currentStep === "error-sharing-profile" ? (
            <ErrorBlock className="my-4">
              <ErrorBlockImage />
              <ErrorBlockDescription>
                Something went wrong when sharing your profile
              </ErrorBlockDescription>
            </ErrorBlock>
          ) : null}
          {currentStep === "profile-shared" ? (
            <SuccessBlock className="my-4">
              <SuccessBlockImage />
              <SuccessBlockDescription>
                Your profile has been shared to the requester
              </SuccessBlockDescription>
            </SuccessBlock>
          ) : null}
          <div className="flex flex-col gap-1">
            <div className="text-muted-foreground">
              <Typography variant="base-semibold">Shared to</Typography>
            </div>
            <Typography variant="base-regular" className="break-words">
              {parsedEndpointUrl.origin}
            </Typography>
            <div className="text-muted-foreground">
              <Typography variant="base-s-regular">
                Verify you trust where your data is sent to before sharing
              </Typography>
            </div>
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
        <CardFooter className="border-t px-6 pt-6">
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
                {currentStep === "profile-shared" ||
                currentStep === "error-sharing-profile"
                  ? "Close"
                  : "Decline"}
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
                <Button
                  onClick={handleShareProfileClick}
                  disabled={currentStep === "sharing-profile"}
                >
                  Share Profile
                </Button>
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

  const { dataSchema, isLoading } = useDataSchema(request.profileJsonSchemaUrl)

  const parsedProfileSchemaUri = useMemo(() => {
    return new URL(request.profileJsonSchemaUrl)
  }, [request.profileJsonSchemaUrl])

  return (
    <Card className={cn("bg-surface-active p-4", className)} {...cardProps}>
      {dataSchema?.title ? (
        <Typography variant="base-semibold">{dataSchema.title}</Typography>
      ) : isLoading ? (
        <Skeleton className="h-4 w-36" />
      ) : null}
      {dataSchema?.description ? (
        <Typography variant="base-regular">{dataSchema.description}</Typography>
      ) : null}
      <Link
        href={request.profileJsonSchemaUrl}
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
            ? "The requester has self-attested that user data will be exposed to third-parties outside of the Verida secure environment."
            : "The requester has self-attested that no user data will be exposed to third-parties outside of the Verida secure environment."}
        </AlertDescription>
      </Alert>
    </Card>
  )
}
RequestedInformationCard.displayName = "RequestedInformationCard"

interface GeneratedProfileCardProps extends ComponentProps<typeof Card> {
  request: UserProfileApiRequest
  isGenerating?: boolean
  generatedProfile: Record<string, unknown> | null
}

function GeneratedProfileCard(props: GeneratedProfileCardProps) {
  const { generatedProfile, request, isGenerating, className, ...cardProps } =
    props

  return (
    <Card className={cn("bg-surface-active p-4", className)} {...cardProps}>
      {generatedProfile ? (
        <>
          <Typography variant="base-regular">
            The following profile has been generated by Verida AI based on your
            personal data
          </Typography>
          <pre className="text-sm">
            <code className="font-mono whitespace-pre-wrap break-all">
              {JSON.stringify(generatedProfile, null, 2)}
            </code>
          </pre>
        </>
      ) : isGenerating ? (
        <LoadingBlock className="mt-4">
          <LoadingBlockSpinner />
          <LoadingBlockDescription>
            Verida AI is generating your profile
          </LoadingBlockDescription>
        </LoadingBlock>
      ) : (
        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockDescription>
            Something went wrong when generating your profile
          </ErrorBlockDescription>
        </ErrorBlock>
      )}
      <Alert variant={request.exposesUserData ? "error" : "warning"}>
        <AlertTitle>Privacy Notice</AlertTitle>
        <AlertDescription>
          {request.exposesUserData
            ? "The requester has self-attested that user data will be exposed to third-parties outside of the Verida secure environment."
            : "The requester has self-attested that no user data will be exposed to third-parties outside of the Verida secure environment."}
        </AlertDescription>
      </Alert>
    </Card>
  )
}
