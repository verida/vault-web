"use client"

import { Close } from "@/components/icons/close"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useDataSchema } from "@/features/verida-data-schemas/hooks/use-data-schema"
import { VeridaRecord } from "@/features/verida-database/types"
import { cn } from "@/styles/utils"

export interface DataRequestItemPageRequestedDataCardProps
  extends Omit<React.ComponentProps<typeof Card>, "children"> {
  requestedItemSchemaUrl: string
  selectedDataItems: VeridaRecord[]
  disableSelection?: boolean
  disableRemoveItems?: boolean
  onRemoveItem?: (itemId: string) => void
  onClickSelect?: () => void
}

export function DataRequestItemPageRequestedDataCard(
  props: DataRequestItemPageRequestedDataCardProps
) {
  const {
    requestedItemSchemaUrl,
    selectedDataItems,
    disableSelection,
    disableRemoveItems,
    onRemoveItem,
    onClickSelect,
    className,
    ...cardProps
  } = props

  const { dataSchema } = useDataSchema(requestedItemSchemaUrl)
  // TODO: Use schema loading and error state

  return (
    <Card
      className={cn("flex flex-col gap-6 bg-surface-active p-4", className)}
      {...cardProps}
    >
      <CardHeader className="flex flex-row items-start gap-3 p-0">
        <Avatar className="size-12">
          <AvatarImage
            src={dataSchema?.appearance?.style?.icon}
            alt="incoming-item-icon"
          />
          <AvatarFallback>
            {dataSchema?.title?.at(0) || EMPTY_VALUE_FALLBACK}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div
            className={cn(
              "min-w-0",
              dataSchema?.title ? "" : "italic text-muted-foreground"
            )}
          >
            <CardTitle variant="heading-5" component="p" className="truncate">
              {dataSchema?.title || "No title"}
            </CardTitle>
          </div>
          <CardDescription
            variant="base-regular"
            className={cn(
              "line-clamp-2",
              dataSchema?.description ? "" : "italic"
            )}
          >
            {dataSchema?.description || "No description"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {selectedDataItems.length > 0 ? (
          <ul className="flex flex-row flex-wrap items-center gap-2">
            {selectedDataItems.map((item) => (
              <li key={item._id}>
                <SelectedDataItemBadge
                  item={item}
                  unselectDisabled={disableRemoveItems}
                  onUnselect={() => onRemoveItem?.(item._id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted-foreground">
            <Typography variant="base-regular">No data selected</Typography>
          </div>
        )}
      </CardBody>
      {disableSelection ? null : (
        <CardFooter className="p-0">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={onClickSelect}
          >
            Select
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
DataRequestItemPageRequestedDataCard.displayName =
  "DataRequestItemPageRequestedDataCard"

interface SelectedDataItemBadgeProps
  extends Omit<React.ComponentProps<typeof Badge>, "children"> {
  item: VeridaRecord
  unselectDisabled?: boolean
  onUnselect?: () => void
}

function SelectedDataItemBadge(props: SelectedDataItemBadgeProps) {
  const { item, unselectDisabled, onUnselect, className, ...badgeProps } = props

  return (
    <Badge
      className={cn(
        "gap-2 bg-primary text-primary-foreground hover:bg-primary",
        className
      )}
      {...badgeProps}
    >
      <Avatar className="-ml-1 size-6 border-0">
        <AvatarImage src={item.icon} />
        <AvatarFallback className="text-muted-foreground">
          {EMPTY_VALUE_FALLBACK}
        </AvatarFallback>
      </Avatar>
      <Typography variant="base-s-regular" className="line-clamp-1">
        {item.name}
      </Typography>
      {unselectDisabled ? null : (
        <Button
          variant="ghost"
          size="icon"
          onClick={onUnselect}
          className="-mr-1 h-auto w-auto rounded-full text-inherit hover:bg-surface-hover/15 focus-visible:ring-primary-foreground"
        >
          <Close />
        </Button>
      )}
    </Badge>
  )
}
SelectedDataItemBadge.displayName = "SelectedDataItemBadge"
