"use client"

import { useMemo } from "react"

import { DataConnectionsList } from "@/app/(connected)/connections/summary/_components/data-connections-list"
import { DataProvidersList } from "@/app/(connected)/connections/summary/_components/data-providers-list"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  ErrorBlockTitle,
} from "@/components/ui/error"
import { Typography } from "@/components/ui/typography"
import { useDataProviders } from "@/features/data-connections/hooks/use-data-providers"
import { useVerida } from "@/features/verida/hooks/use-verida"

export const onboardingStepId = "steup-connections"
export const onboardingStepBreadcrumbTitle = "Extract Data"

export interface OnboardingStepSetupConnectionsContentProps {
  onPreviousStepClick: () => void
  previousStepButtonLabel?: string
  onNextStepClick: () => void
  nextStepButtonLabel?: string
}

export function OnboardingStepSetupConnectionsContent(
  props: OnboardingStepSetupConnectionsContentProps
) {
  const {
    onPreviousStepClick,
    previousStepButtonLabel = "Back",
    onNextStepClick,
    nextStepButtonLabel = "Next",
  } = props

  const { isConnected } = useVerida()
  const { providers, isLoading, isError } = useDataProviders()

  const filteredProviders = useMemo(
    () => providers?.filter((provider) => provider.status === "active"),
    [providers]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Extract Your Personal Data</CardTitle>
        <CardDescription>
          {
            "Connect to web2 platforms to extract your personal data into the Verida Vault"
          }
        </CardDescription>
      </CardHeader>
      <CardBody className="flex flex-col gap-8">
        {!isConnected ? (
          <ErrorBlock>
            <ErrorBlockImage />
            <ErrorBlockTitle>You are not connected</ErrorBlockTitle>
            <ErrorBlockDescription>
              Go back to the previous step to connect to the Verida Vault
            </ErrorBlockDescription>
          </ErrorBlock>
        ) : (
          <>
            <section className="flex flex-col gap-4">
              <Typography variant="heading-4">Data Connections</Typography>
              <DataConnectionsList />
            </section>
            <section className="flex flex-col gap-4">
              <Typography variant="heading-4">Available Platforms</Typography>
              <DataProvidersList
                providers={filteredProviders}
                isLoading={isLoading}
                isError={isError}
                disableRedirectToConnectionPage
              />
              <Alert variant="info">
                <AlertDescription>
                  The first synchronization can take some time to complete.
                </AlertDescription>
              </Alert>
            </section>
            <div className="text-muted-foreground">
              <Typography variant="base-s-regular">
                Note: This step is optional, you can set up your data
                connections later.
              </Typography>
            </div>
          </>
        )}
      </CardBody>
      <CardFooter className="flex flex-row justify-between gap-4">
        <Button
          variant="outline"
          onClick={onPreviousStepClick}
          className="w-full sm:w-fit"
        >
          {previousStepButtonLabel}
        </Button>
        <Button onClick={onNextStepClick} className="w-full sm:w-fit">
          {nextStepButtonLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
OnboardingStepSetupConnectionsContent.displayName =
  "OnboardingStepSetupConnectionsContent"
