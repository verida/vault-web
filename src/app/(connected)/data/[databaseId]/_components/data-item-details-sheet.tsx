"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

import { Copy } from "@/components/icons/copy"
import { Delete } from "@/components/icons/delete"
import { Pin } from "@/components/icons/pin"
import {
  ModalSheet,
  ModalSheetBody,
  ModalSheetHeader,
} from "@/components/modal-sheet"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DataSchema, DatabaseDefinition } from "@/features/data/types"

export type DataItemDetailsSheetProps = {
  open: boolean
  data?: any
  schema?: DataSchema
  folder?: DatabaseDefinition
}

/**
 * @deprecated
 */
export function DataItemDetailsSheet(props: DataItemDetailsSheetProps) {
  const { open, data, folder, schema } = props

  const router = useRouter()
  const pathName = usePathname()

  const onClose = () => {
    router.push(pathName)
  }
  return (
    <ModalSheet open={open} onClose={onClose}>
      <ModalSheetHeader
        actions={
          <div className="flex gap-3 pl-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy Address</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Pin />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pin</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Delete className="[&_*]:stroke-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        }
        onClose={onClose}
        title={
          !data ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-7 w-32" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={data.icon}
                width={40}
                height={40}
                alt="data icon"
                className="h-10 w-10"
              />
              <Typography variant="heading-4" className="truncate">
                {data?.name}
              </Typography>
            </div>
          )
        }
      />
      <ModalSheetBody>
        {!data || !schema ? (
          <div className="space-y-6">
            {[...new Array(5)].map((_, i) => (
              <Skeleton className="h-10 w-full" key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b pb-4">
              <Typography
                variant="base-regular"
                className="text-muted-foreground"
              >
                Display on Verida One profile
              </Typography>
              <Switch />
            </div>
            <div className="mt-8 space-y-6">
              <Typography variant="heading-4">{folder?.title} Data</Typography>
              {schema?.layouts?.view.map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <Typography
                    variant="heading-5"
                    className="text-muted-foreground"
                  >
                    {schema.properties[key].title}
                  </Typography>
                  <Typography variant="heading-5">{data[key]}</Typography>
                </div>
              ))}
            </div>
          </>
        )}
      </ModalSheetBody>
    </ModalSheet>
  )
}
