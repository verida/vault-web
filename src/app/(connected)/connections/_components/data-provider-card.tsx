import {
  ConnectDataProviderDialog,
  ConnectDataProviderDialogTrigger,
} from "@/app/(connected)/connections/_components/connect-data-provider-dialog"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DataProvider } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataProviderCardProps = {
  provider: DataProvider
} & React.ComponentProps<typeof Card>

export function DataProviderCard(props: DataProviderCardProps) {
  const { provider, className, ...cardProps } = props

  return (
    <Card className={cn(className)} {...cardProps}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-start justify-between gap-4">
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
              <Button size="lg" variant="outline">
                Connect
              </Button>
            </ConnectDataProviderDialogTrigger>
          </ConnectDataProviderDialog>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="heading-4">{provider.label}</Typography>
          <p className="text-muted-foreground">
            <Typography
              variant="base-l"
              component="span"
              className="line-clamp-3"
            >
              {provider.description}
            </Typography>
          </p>
        </div>
      </div>
    </Card>
  )
}
DataProviderCard.displayName = "DataProviderCard"

export type DataProviderSkeletonCardProps = React.ComponentProps<typeof Card>

export function DataProviderSkeletonCard(props: DataProviderSkeletonCardProps) {
  const { className, ...cardProps } = props

  return (
    <Card className={cn(className)} {...cardProps}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-start justify-between gap-4">
          <Skeleton className="size-12 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="my-1 h-4 w-1/3 sm:h-5" />
          <div className="flex flex-col gap-0">
            <Skeleton className="my-1.5 h-4 w-full" />
            <Skeleton className="my-1.5 h-4 w-3/4" />
          </div>
        </div>
      </div>
    </Card>
  )
}
DataProviderSkeletonCard.displayName = "DataProviderSkeletonCard"
