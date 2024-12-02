import {
  ConnectDataProviderDialog,
  ConnectDataProviderDialogTrigger,
} from "@/app/(connected)/connections/summary/_components/connect-data-provider-dialog"
import { ConnectionsSecurityDetailsPopover } from "@/app/(connected)/connections/summary/_components/connections-security-details-popover"
import { DataConnectionsList } from "@/app/(connected)/connections/summary/_components/data-connections-list"
import { DataProvidersSection } from "@/app/(connected)/connections/summary/_components/data-providers-section"
import { SummarySectionWrapper } from "@/app/(connected)/connections/summary/_components/summary-section-wrapper"
import { SyncAllConnectionsButton } from "@/app/(connected)/connections/summary/_components/sync-all-connections-button"
import { PlusIcon } from "@/components/icons/plus-icon"
import { PageWrapper } from "@/components/page-wrapper"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"

export default function ConnectionsSummaryPage() {
  return (
    <PageWrapper
      pageTitle="Connections"
      rightContent={
        <div className="flex flex-row items-center gap-2">
          <SyncAllConnectionsButton />
          <ConnectDataProviderDialog>
            <ConnectDataProviderDialogTrigger asChild>
              <Button
                variant="primary"
                className="h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2"
              >
                <PlusIcon className="size-5 sm:hidden" />
                <span className="sr-only sm:not-sr-only">Add Connection</span>
              </Button>
            </ConnectDataProviderDialogTrigger>
          </ConnectDataProviderDialog>
        </div>
      }
    >
      <div className="flex flex-col gap-8 sm:gap-10">
        <SummarySectionWrapper
          sectionTitle={
            <div className="flex flex-row items-center gap-4">
              <Typography variant="heading-4">Connected Accounts</Typography>
              <ConnectionsSecurityDetailsPopover />
            </div>
          }
        >
          <DataConnectionsList />
        </SummarySectionWrapper>
        <DataProvidersSection
          filteredStatus="active"
          sectionTitle="Available Platforms"
        />
        <DataProvidersSection
          filteredStatus="upcoming"
          sectionTitle="Upcoming Platforms"
          hideIfEmpty
          hideIfError
          hideIfLoading
        />
      </div>
    </PageWrapper>
  )
}
ConnectionsSummaryPage.displayName = "ConnectionsSummaryPage"
