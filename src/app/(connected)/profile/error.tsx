"use client"

import {
  ErrorPageContent,
  type ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function ProfileErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error loading your profile"
      error={error}
      reset={reset}
    />
  )
}
ProfileErrorPage.displayName = "ProfileErrorPage"
