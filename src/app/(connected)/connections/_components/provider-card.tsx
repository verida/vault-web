import {
  ConnectProviderDialog,
  ConnectProviderDialogTrigger,
} from "@/app/(connected)/connections/_components/connect-provider-dialog"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Provider } from "@/features/connections"

export type ProviderCardProps = {
  provider: Provider
}

export function ProviderCard(props: ProviderCardProps) {
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
          <ConnectProviderDialog providerName={provider.name}>
            <ConnectProviderDialogTrigger asChild>
              <Button size="lg" variant="outline" className="!mt-0 px-4">
                Connect
              </Button>
            </ConnectProviderDialogTrigger>
          </ConnectProviderDialog>
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
ProviderCard.displayName = "ProviderCard"
