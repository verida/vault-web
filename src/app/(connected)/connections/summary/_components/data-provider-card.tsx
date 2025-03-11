import { type ComponentProps } from "react"

import {
  ConnectDataProviderDialog,
  ConnectDataProviderDialogTrigger,
} from "@/app/(connected)/connections/summary/_components/connect-data-provider-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardBody, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import type { DataProvider } from "@/features/data-connections/types"

// TODO: Move to `@/components/...`

export interface DataProviderCardProps
  extends Omit<ComponentProps<typeof Card>, "children"> {
  provider: DataProvider
  disableRedirectToConnectionPage?: boolean
}

export function DataProviderCard(props: DataProviderCardProps) {
  const { provider, className, disableRedirectToConnectionPage, ...cardProps } =
    props

  return (
    <Card className={className} {...cardProps}>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <Avatar className="size-12">
          <AvatarImage src={provider.icon} alt={provider.label} />
          <AvatarFallback>{provider.label?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        {provider.status === "active" ? (
          <ConnectDataProviderDialog
            providerId={provider.id}
            disableRedirectToConnectionPage={disableRedirectToConnectionPage}
          >
            <ConnectDataProviderDialogTrigger asChild>
              <Button size="lg" variant="outline">
                Connect
              </Button>
            </ConnectDataProviderDialogTrigger>
          </ConnectDataProviderDialog>
        ) : provider.status === "upcoming" ? (
          <div className="flex h-10 flex-row items-center text-muted-foreground">
            <Typography variant="base-semibold">Upcoming</Typography>
          </div>
        ) : null}
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <Typography variant="heading-4" component="h5">
          {provider.label}
        </Typography>
        <div className="text-muted-foreground">
          <Typography variant="base-regular" className="line-clamp-3">
            {provider.description}
          </Typography>
        </div>
      </CardBody>
    </Card>
  )
}
DataProviderCard.displayName = "DataProviderCard"

export interface DataProviderSkeletonCardProps
  extends ComponentProps<typeof Card> {}

export function DataProviderSkeletonCard(props: DataProviderSkeletonCardProps) {
  const { className, ...cardProps } = props

  return (
    <Card className={className} {...cardProps}>
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
    </Card>
  )
}
DataProviderSkeletonCard.displayName = "DataProviderSkeletonCard"
