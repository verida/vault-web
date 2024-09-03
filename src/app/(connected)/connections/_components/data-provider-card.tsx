import {
  ConnectDataProviderDialog,
  ConnectDataProviderDialogTrigger,
} from "@/app/(connected)/connections/_components/connect-data-provider-dialog"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DataProvider } from "@/features/connections"

export type DataProviderCardProps = {
  provider: DataProvider
}

export function DataProviderCard(props: DataProviderCardProps) {
  const { provider } = props

  return (
    <div className="flex h-full flex-col">
      <Card className="-mt-4 flex-grow">
        <CardHeader className="flex flex-row justify-between pb-0">
          {provider.icon ? (
            // <Image
            //   src={iconUrl}
            //   alt={label}
            //   width={48}
            //   height={48}
            //   className="size-12 rounded-full border"
            // />
            /* eslint-disable @next/next/no-img-element */
            <img
              src={provider.icon}
              alt={provider.label}
              width={48}
              height={48}
              className="size-12 rounded-full border"
            />
          ) : null}
          <ConnectDataProviderDialog providerName={provider.name}>
            <ConnectDataProviderDialogTrigger asChild>
              <Button size="lg" variant="outline" className="!mt-0 px-4">
                Connect
              </Button>
            </ConnectDataProviderDialogTrigger>
          </ConnectDataProviderDialog>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Typography variant="heading-4" className="mb-2 mt-6">
            {provider.label}
          </Typography>
          {provider.description && (
            <Typography variant="base-l" className="text-muted-foreground">
              {provider.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
DataProviderCard.displayName = "DataProviderCard"
