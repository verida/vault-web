"use client"

import { useEffect } from "react"

import { ErrorPageProps } from "@/components/layouts/error-page-content"
import { Logger } from "@/features/telemetry/logger"
import { useToast } from "@/features/toasts/use-toast"

const logger = Logger.create("error-boundary")

export default function DataItemErrorPage(props: ErrorPageProps) {
  const { error } = props

  const { toast } = useToast()

  useEffect(() => {
    logger.error(error)

    toast({
      variant: "error",
      title: "Error",
      description: "An error occurred while loading the data item",
    })
  }, [error, toast])

  // Returning null as the item page is supposed to be a parallel route
  // displaying a modal, if this error page is not a modal, the content will be
  // displayed outside of the modal and cause layout shift in the parent page
  return null
}
DataItemErrorPage.displayName = "DataItemErrorPage"
