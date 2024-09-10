"use client"

import { ChevronRight } from "lucide-react"

import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DialogBody } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { DataProvider, useDataProviders } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type ConnectDataProviderDialogProviderSelectionProps = {
  onSelectItem: (provider: DataProvider) => void
}

export function ConnectDataProviderDialogProviderSelection(
  props: ConnectDataProviderDialogProviderSelectionProps
) {
  const { onSelectItem } = props

  const { providers, isLoading: isLoadingProviders } = useDataProviders()

  return (
    <DialogBody>
      <div className="flex flex-col gap-3 px-1">
        {providers && providers.length === 0 ? (
          <Typography variant="base-regular">
            There are no available platforms at the moment.
          </Typography>
        ) : providers && providers.length !== 0 ? (
          <>
            {providers.map((provider) => (
              <ProviderSelectionItem
                key={provider.name}
                provider={provider}
                onClick={() => onSelectItem(provider)}
              />
            ))}
          </>
        ) : isLoadingProviders ? (
          <>
            {[...Array(3)].map((_, index) => (
              <ProviderSelectionItemSkeleton key={index} />
            ))}
          </>
        ) : (
          <Alert variant="error">
            <AlertDescription>
              There has been an error getting the available platforms. Please
              try again later.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </DialogBody>
  )
}
ConnectDataProviderDialogProviderSelection.displayName =
  "ConnectDataProviderDialogProviderSelection"

type ProviderSelectionItemProps = {
  provider: DataProvider
} & React.ComponentProps<typeof Button>

function ProviderSelectionItem(props: ProviderSelectionItemProps) {
  const { provider, className, ...buttonProps } = props

  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto w-full whitespace-normal rounded-lg p-4 pr-3",
        className
      )}
      {...buttonProps}
    >
      <div className="flex w-full flex-row items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={provider.icon} alt={provider.label} />
          <AvatarFallback>{provider.label?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start text-start">
          <Typography variant="heading-4">{provider.label}</Typography>
          <div
            className="text-muted-foreground" // FIXME: Fix class conflicts in the Typography with text-muted-foreground removing the class text-base-s-regular
          >
            <Typography variant="base-s-regular" className="line-clamp-2">
              {provider.description}
            </Typography>
          </div>
        </div>
        <ChevronRight className="shrink-0 text-muted-foreground" />
      </div>
    </Button>
  )
}
ProviderSelectionItem.displayName = "ProviderSelectionItem"

type ProviderSelectionItemSkeletonProps = React.ComponentProps<"div">

function ProviderSelectionItemSkeleton(
  props: ProviderSelectionItemSkeletonProps
) {
  const { className, ...divProps } = props

  return (
    <div className={cn("rounded-lg", className)} {...divProps}>
      <Card className="flex w-full flex-row items-center gap-3 p-4 pr-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-1 flex-col items-start text-start">
          <Skeleton className="my-1 h-4 w-1/3 sm:h-5" />
          <div className="flex flex-col gap-0">
            <Skeleton className="my-1.5 h-4 w-full" />
            <Skeleton className="my-1.5 h-4 w-3/4" />
          </div>
        </div>
      </Card>
    </div>
  )
}
ProviderSelectionItemSkeleton.displayName = "ProviderSelectionItemSkeleton"
