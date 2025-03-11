"use client"

import { useMemo } from "react"

import { DataConnectionCard } from "@/app/(connected)/connections/summary/_components/data-connection-card"
import { DataProvidersList } from "@/app/(connected)/connections/summary/_components/data-providers-list"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { Typography } from "@/components/ui/typography"
import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"
import { useDataProviders } from "@/features/data-connections/hooks/use-data-providers"
import {
  OnboardingCard,
  OnboardingCardBody,
  OnboardingCardHeader,
} from "@/features/onboarding/components/onboarding-card"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export default function OnboardingExtractDataPage() {
  const { isConnected } = useVerida()
  const { connections } = useDataConnections()
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
            {connections && connections.length > 0 ? (
              <section className="flex flex-col gap-4">
                <Typography variant="heading-4">
                  You already have existing Data Connections
                </Typography>
                <div
                  className={cn(
                    "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                  )}
                >
                  {connections.map((connection) => (
                    <article key={connection._id}>
                      <DataConnectionCard
                        connection={connection}
                        className="h-full"
                        hideDetailsLink
                      />
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
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
