"use client"

import {
  ErrorPageContent,
  type ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function NewDataConnectionCallbackErrorPage(
  props: ErrorPageProps
) {
  const { error, reset } = props

  return <ErrorPageContent error={error} reset={reset} hideNavigationButton />
}
NewDataConnectionCallbackErrorPage.displayName =
  "NewDataConnectionCallbackErrorPage"
