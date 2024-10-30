import {
  ConnectDataProviderDialog,
  ConnectDataProviderDialogTrigger,
} from "@/app/(connected)/connections/summary/_components/connect-data-provider-dialog"
import { DataConnectionsList } from "@/app/(connected)/connections/summary/_components/data-connections-list"
import { DataProvidersList } from "@/app/(connected)/connections/summary/_components/data-providers-list"
import { SyncAllConnectionsButton } from "@/app/(connected)/connections/summary/_components/sync-all-connections-button"
import { PageWrapper } from "@/components/page-wrapper"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"

export default function ConnectionsSummaryPage() {
  return (
    <PageWrapper
      pageTitle="Connections"
      leftContent={
        <div className="flex flex-row items-center gap-2">
          <SyncAllConnectionsButton />
          <ConnectDataProviderDialog>
            <ConnectDataProviderDialogTrigger asChild>
              <Button variant="primary">Add Connection</Button>
            </ConnectDataProviderDialogTrigger>
          </ConnectDataProviderDialog>
        </div>
      }
    >
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-4 sm:gap-6">
          <Typography variant="heading-4">Connected Accounts</Typography>
          <DataConnectionsList />
        </div>
        <div className="flex flex-col gap-4 sm:gap-6">
          <Typography variant="heading-4">Available Platforms</Typography>
          <DataProvidersList />
        </div>
      </div>
    </PageWrapper>
  )
}
ConnectionsSummaryPage.displayName = "ConnectionsSummaryPage"
