"use client"

import Image from "next/image"
import { useMemo } from "react"

import { Close } from "@/components/icons/close"
import { PlusIcon } from "@/components/icons/plus-icon"
import { Typography } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
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
        isAdded ? "border-status-added bg-status-added" : "bg-surface-active"
      )}
    >
      <div>
        <Typography variant="heading-5">{data.title}</Typography>
        <Typography variant="base-s-regular">{data.description}</Typography>
      </div>

      {selectedItems.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            // TODO: Create dedicated data request item badge component
            <Badge key={`badge-${item._id}`} className="gap-1">
              {item.icon ? (
                <Image
                  src={item.icon}
                  alt=""
                  width="24"
                  height="24"
                  className="-ml-1 rounded-full bg-surface"
                />
              ) : null}
              <Typography variant="base-s-regular">{item.name}</Typography>
              {disabled ? null : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveChip(item._id)}
                  className="-mr-1 h-auto w-auto rounded-full text-inherit"
                >
                  <Close />
                </Button>
              )}
            </Badge>
          ))}
        </div>
      ) : null}
      {disabled ? (
        <></>
      ) : (
        <Button variant="outline" className="w-full gap-2" onClick={onAdd}>
          <PlusIcon />
          Add
        </Button>
      )}
    </Card>
  )
}
