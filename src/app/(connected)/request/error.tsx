"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function RequestErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return <ErrorPageContent error={error} reset={reset} />
}
RequestErrorPage.displayName = "RequestErrorPage"
