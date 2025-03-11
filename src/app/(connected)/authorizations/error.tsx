"use client"

import React from "react"

import {
  ErrorPageContent,
  type ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function AuthorizationsErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error loading your authorized apps"
      error={error}
      reset={reset}
    />
  )
}
AuthorizationsErrorPage.displayName = "AuthorizationsErrorPage"
