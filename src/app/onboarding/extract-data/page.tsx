"use client"

import { useMemo } from "react"

import { DataConnectionsList } from "@/app/(connected)/connections/summary/_components/data-connections-list"
import { DataProvidersList } from "@/app/(connected)/connections/summary/_components/data-providers-list"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { Typography } from "@/components/ui/typography"
import { useDataProviders } from "@/features/data-connections/hooks/use-data-providers"
import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"
import { useVerida } from "@/features/verida/hooks/use-verida"

export default function OnboardingExtractDataPage() {
  const { isConnected } = useVerida()
  const { providers, isLoading, isError } = useDataProviders()

  const filteredProviders = useMemo(
    () => providers?.filter((provider) => provider.status === "active"),
    [providers]
  )

  return (
    <OnboardingCard>
      <OnboardingCardHeader
        title="Extract Your Personal Data"
        description="Connect to web2 platforms to extract your personal data into the Verida Vault"
      />
      <OnboardingCardBody className="flex flex-col gap-8">
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
      </OnboardingCardBody>
    </OnboardingCard>
  )
}
OnboardingExtractDataPage.displayName = "OnboardingExtractDataPage"
