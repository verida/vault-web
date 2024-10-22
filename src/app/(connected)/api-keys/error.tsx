"use client"

import React from "react"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/error-page-content"

export default function ApiKeysErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error loading the API Keys"
      error={error}
      reset={reset}
    />
  )
}
ApiKeysErrorPage.displayName = "ApiKeysErrorPage"
