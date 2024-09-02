"use client"

import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

import { ArrowLeft } from "@/components/icons/arrow-left"
import { SearchInput } from "@/components/search-input"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida"

const logger = Logger.create("Inbox")

export type RequestDataSelectorProps = {
  schemaUrl: string
  filter: any
  defaultItems: any[]
  onClose: () => void
  onConfirm: (items: any[]) => void
}

export function RequestDataSelector(props: RequestDataSelectorProps) {
  const { schemaUrl, filter, onClose, onConfirm, defaultItems } = props

  const { openDatastore, did } = useVerida()

  const [searchValue, setSearchValue] = useState("")
  const [selectedItems, setSelectedItems] = useState<any[]>(defaultItems)

  const fetchData = useCallback(
    async (searchValue: string) => {
      try {
        const requestFilter = filter && typeof filter === "object" ? filter : {}

        const searchFilter =
          searchValue && searchValue.length > 0
            ? {
                $or: [
                  {
                    name: {
                      $regex: searchValue,
                    },
                  },
                  {
                    summary: {
                      $regex: searchValue,
                    },
                  },
                ],
              }
            : {}

        const query = {
          $and: [requestFilter, searchFilter],
        }

        const datastore = await openDatastore(schemaUrl, undefined)
        const result = await datastore?.getMany(query, undefined)

        return result
      } catch (error) {
        logger.error(error)
      }
    },
    [filter, openDatastore, schemaUrl]
  )

  useEffect(() => {
    fetchData("")
  }, [fetchData])

  const { data, isPending } = useQuery({
    queryKey: ["requestedData", searchValue, did, schemaUrl],
    queryFn: () => fetchData(searchValue),
    staleTime: 0,
  })

  return (
    <>
      <DrawerHeader className="flex flex-col gap-1.5 space-y-3 border-b px-6 py-4 text-center sm:text-left">
        <div className="flex items-center space-x-3">
          <ArrowLeft onClick={() => onClose()} className="cursor-pointer" />
          <DrawerTitle className="text-lg font-semibold leading-none tracking-tight">
            Select an Item
          </DrawerTitle>
        </div>
        <div className="flex items-center space-x-3">
          <SearchInput
            className="w-full"
            onValueChange={(value) => setSearchValue(value)}
          />
        </div>
      </DrawerHeader>

      <DrawerBody className="overflow-y-auto p-6">
        {isPending && (
          <Typography variant="base-semibold" className="text-center">
            Loading...
          </Typography>
        )}

        {!isPending && !data?.length && (
          <Typography variant="base-semibold" className="text-center">
            No Items
          </Typography>
        )}
        <div className="space-y-2">
          {(data || []).map((item: any) => (
            <Card
              key={`card-${item._id}`}
              className="flex items-center px-4 py-3"
            >
              <label
                htmlFor={item._id}
                className="flex flex-grow items-center gap-2"
              >
                <Image
                  src={item.icon}
                  alt="data-request-item"
                  width="60"
                  height="60"
                  className="aspect-square rounded-full border object-cover"
                />
                <div>
                  <Typography variant="heading-5">{item.name}</Typography>
                  <Typography
                    variant="base-s-semibold"
                    className="text-muted-foreground"
                  >
                    {item.summary}
                  </Typography>
                  <Typography
                    variant="base-s-semibold"
                    className="text-muted-foreground/60"
                  >
                    {moment(new Date(item.insertedAt)).format("DD/MM/YY hh:mm")}
                  </Typography>
                </div>
              </label>
              <Checkbox
                defaultChecked={
                  selectedItems.findIndex((sItem) => sItem._id === item._id) >=
                  0
                }
                onCheckedChange={(checked) => {
                  if (!checked) {
                    setSelectedItems((prev) =>
                      prev.filter((sItem) => sItem._id !== item._id)
                    )
                  } else {
                    setSelectedItems((prev) => [...prev, item])
                  }
                }}
                id={item._id}
              />
            </Card>
          ))}
        </div>
      </DrawerBody>

      <DrawerFooter className="mt-auto flex flex-col gap-3 border-t p-6">
        <Alert variant="warning">
          <AlertDescription>
            {`Carefully review your selection`}
          </AlertDescription>
        </Alert>
        <Button
          onClick={() => onConfirm(selectedItems)}
          disabled={selectedItems.length <= 0}
        >
          Confirm Selection
        </Button>
      </DrawerFooter>
    </>
  )
}
