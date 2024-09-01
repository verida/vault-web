"use client"

import { useMemo } from "react"

import { Chip } from "@/components/chip"
import { Check } from "@/components/icons/check"
import { Plus } from "@/components/icons/plus"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/styles/utils"

export type DataRequestItemProps = {
  data: Record<string, any>
  selectedItems: Record<string, any>[]
  onAdd: () => void
  onRemoveChip: (_id: string) => void
  disabled?: boolean
}

export function DataRequestItem(props: DataRequestItemProps) {
  const {
    disabled = false,
    data = {},
    selectedItems,
    onAdd,
    onRemoveChip,
  } = props

  const isAdded = useMemo(() => {
    return selectedItems.length > 0
  }, [selectedItems])

  return (
    <Card
      className={cn(
        "mt-4 flex flex-col gap-6 border p-4",
        isAdded ? "border-status-added bg-status-added" : "bg-muted"
      )}
    >
      <div>
        <Typography variant="heading-5">{data.title}</Typography>
        <Typography variant="base-s-regular">{data.description}</Typography>
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <Chip
              key={`chip-${item._id}`}
              id={item._id}
              icon={item.icon}
              text={item.name}
              onClose={disabled ? undefined : onRemoveChip}
            />
          ))}
        </div>
      )}
      {disabled ? (
        <></>
      ) : isAdded ? (
        <Button
          variant="outline"
          className="w-full gap-2 text-status-added"
          onClick={onAdd}
        >
          <Check />
          Added
        </Button>
      ) : (
        <Button variant="outline" className="w-full gap-2" onClick={onAdd}>
          <Plus />
          Add
        </Button>
      )}
    </Card>
  )
}
