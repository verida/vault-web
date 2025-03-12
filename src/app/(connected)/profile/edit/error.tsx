"use client"

import {
  ErrorPageContent,
  type ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function ProfileEditErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error loading the profile editor"
      error={error}
      reset={reset}
    />
  )
}
ProfileEditErrorPage.displayName = "ProfileEditErrorPage"
