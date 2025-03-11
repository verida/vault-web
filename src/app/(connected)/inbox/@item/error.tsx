"use client"

import { useEffect } from "react"

import { type ErrorPageProps } from "@/components/layouts/error-page-content"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("error-boundary")

export default function InboxItemErrorPage(props: ErrorPageProps) {
  const { error } = props

  useEffect(() => {
    logger.error(error)
  }, [error])

  // TODO: Display a notification to the user

  // Returning null as the item page is supposed to be a parallel route
  // displaying a modal, if this error page is not a modal, the content will be
  // displayed outside of the modal and cause layout shift in the parent page
  return null
}
InboxItemErrorPage.displayName = "InboxItemErrorPage"
