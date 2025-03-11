"use client"

import {
  ErrorPageContent,
  type ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function RequestErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return <ErrorPageContent error={error} reset={reset} />
}
RequestErrorPage.displayName = "RequestErrorPage"
