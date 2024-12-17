"use client"

import { intlFormat, isDate } from "date-fns"
import Link from "next/link"
import { useCallback, useMemo } from "react"

import { DeleteIcon } from "@/components/icons/delete-icon"
import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetContent,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { RevokeAuthorizedAppDialog } from "@/features/authorized-apps/components/revoke-authorized-app-dialog"
import { useAuthorizedApp } from "@/features/authorized-apps/hooks/use-authorized-app"
import { ALL_DATABASE_DEFS } from "@/features/data/constants"
import { VeridaOauthScope } from "@/features/verida-oauth/types"
import { cn } from "@/styles/utils"
import { SHORT_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

type AuthorizedAppItemPageContentProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemId: string
}

export function AuthorizedAppItemPageContent(
  props: AuthorizedAppItemPageContentProps
) {
  const { open, onOpenChange, itemId } = props

  const { authorizedApp, isLoading, isError } = useAuthorizedApp({
    authorizedAppRecordId: itemId,
  })

  const handleClose = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const handleRevoke = useCallback(() => {
    handleClose()
  }, [handleClose])

  const title = useMemo(() => {
    if (authorizedApp) {
      return <>{authorizedApp.name}</>
    }

    if (isLoading) {
      return <Skeleton className="h-6 w-64" />
    }

    return (
      <span className="italic text-muted-foreground">
        {`<Unknown Authorized App>`}
      </span>
    )
  }, [isLoading, authorizedApp])

  const body = useMemo(() => {
    if (authorizedApp) {
      return (
        <div className="flex flex-col gap-4">
          <ItemFieldUrl url={authorizedApp.url} />
          <ItemFieldScopes scopes={authorizedApp.scopes} />
          <ItemFieldLastUsed lastUsed={authorizedApp.lastAccessedAt} />
          <ItemFieldCreated createdAt={authorizedApp.insertedAt} />
        </div>
      )
    }

    if (isLoading) {
      return (
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle>Loading authorized app...</LoadingBlockTitle>
          <LoadingBlockDescription>
            Please wait while we fetch the authorized app details.
          </LoadingBlockDescription>
        </LoadingBlock>
      )
    }

    if (isError) {
      return (
        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockTitle>Error fetching data</ErrorBlockTitle>
          <ErrorBlockDescription>
            There was an error retrieving the authorized app. Please try again
            later.
          </ErrorBlockDescription>
        </ErrorBlock>
      )
    }

    return (
      <ErrorBlock>
        <ErrorBlockImage />
        <ErrorBlockTitle>Item not found</ErrorBlockTitle>
        <ErrorBlockDescription>
          The requested authorized app could not be found.
        </ErrorBlockDescription>
      </ErrorBlock>
    )
  }, [authorizedApp, isLoading, isError])

  return (
    <ItemSheet open={open} onOpenChange={onOpenChange}>
      <ItemSheetContent>
        <ItemSheetHeader
          right={
            authorizedApp ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <RevokeAuthorizedAppDialog
                    authorizedApp={authorizedApp}
                    onRevoke={handleRevoke}
                  >
                    <Button variant="outline-destructive" size="icon">
                      <DeleteIcon className="size-5 shrink-0" />
                      <span className="sr-only">Revoke</span>
                    </Button>
                  </RevokeAuthorizedAppDialog>
                </TooltipTrigger>
                <TooltipContent>Revoke</TooltipContent>
              </Tooltip>
            ) : undefined
          }
        >
          <ItemSheetTitle description="Authorized app">{title}</ItemSheetTitle>
        </ItemSheetHeader>
        <ItemSheetBody>{body}</ItemSheetBody>
        <ItemSheetFooter className="flex flex-col gap-4">
          <Alert variant="warning">
            <AlertTitle>Non-functional</AlertTitle>
            <AlertDescription>
              This Authorized Apps feature is not functional yet. Only the UI
              has been (partially) implemented for the moment.
            </AlertDescription>
          </Alert>
          <Button variant="outline" className="w-full" onClick={handleClose}>
            Close
          </Button>
        </ItemSheetFooter>
      </ItemSheetContent>
    </ItemSheet>
  )
}
AuthorizedAppItemPageContent.displayName = "AuthorizedAppItemPageContent"

type ItemFieldUrlProps = {
  url?: string
} & Omit<React.ComponentProps<typeof ItemField>, "propertyName" | "children">

export function ItemFieldUrl(props: ItemFieldUrlProps) {
  const { url, ...itemFieldProps } = props

  if (!url) {
    return (
      <ItemField propertyName="URL" {...itemFieldProps}>
        <Typography variant="base-regular" className="truncate">
          {EMPTY_VALUE_FALLBACK}
        </Typography>
      </ItemField>
    )
  }

  const urlObject = new URL(url)

  return (
    <ItemField propertyName="URL" {...itemFieldProps}>
      <Link
        href={urlObject.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        <Typography variant="base-regular" className="truncate">
          {`${urlObject.protocol}//${urlObject.hostname}`}
        </Typography>
      </Link>
    </ItemField>
  )
}
ItemFieldUrl.displayName = "ItemFieldUrl"

type ItemFieldScopesProps = {
  scopes?: VeridaOauthScope[]
} & Omit<React.ComponentProps<typeof ItemField>, "propertyName" | "children">

export function ItemFieldScopes(props: ItemFieldScopesProps) {
  const { scopes, ...itemFieldProps } = props

  const formatScope = useCallback((scope: VeridaOauthScope) => {
    const databaseDef = ALL_DATABASE_DEFS.find(
      (db) => db.databaseVaultName === scope.database
    )

    return (
      <Typography variant="base-regular">
        <span className="capitalize">{scope.operation}</span>{" "}
        {scope.operation === "write" ? "on your" : "your"}{" "}
        <span className="font-semibold lowercase">
          {databaseDef?.titlePlural || scope.database}
        </span>
      </Typography>
    )
  }, [])

  if (!scopes) {
    return (
      <ItemField propertyName="Authorizations" {...itemFieldProps}>
        <Typography variant="base-regular" className="truncate">
          {EMPTY_VALUE_FALLBACK}
        </Typography>
      </ItemField>
    )
  }

  return (
    <ItemField propertyName="Authorizations" {...itemFieldProps}>
      <ul className="flex flex-col gap-1">
        {scopes.map((scope, index) => (
          <li key={index}>{formatScope(scope)}</li>
        ))}
      </ul>
    </ItemField>
  )
}
ItemFieldScopes.displayName = "ItemFieldScopes"

type ItemFieldLastUsedProps = {
  lastUsed?: string
} & Omit<React.ComponentProps<typeof ItemField>, "propertyName" | "children">

export function ItemFieldLastUsed(props: ItemFieldLastUsedProps) {
  const { lastUsed, ...itemFieldProps } = props

  if (!lastUsed) {
    return (
      <ItemField propertyName="Last Used" {...itemFieldProps}>
        <Typography variant="base-regular" className="truncate">
          {EMPTY_VALUE_FALLBACK}
        </Typography>
      </ItemField>
    )
  }

  const date = new Date(lastUsed)

  return (
    <ItemField propertyName="Last Used" {...itemFieldProps}>
      <Typography variant="base-regular" className="truncate">
        {isDate(date)
          ? intlFormat(date, SHORT_DATE_TIME_FORMAT_OPTIONS)
          : EMPTY_VALUE_FALLBACK}
      </Typography>
    </ItemField>
  )
}
ItemFieldLastUsed.displayName = "ItemFieldLastUsed"

type ItemFieldCreatedProps = {
  createdAt?: string
} & Omit<React.ComponentProps<typeof ItemField>, "propertyName" | "children">

export function ItemFieldCreated(props: ItemFieldCreatedProps) {
  const { createdAt, ...itemFieldProps } = props

  if (!createdAt) {
    return (
      <ItemField propertyName="Created" {...itemFieldProps}>
        <Typography variant="base-regular" className="truncate">
          {EMPTY_VALUE_FALLBACK}
        </Typography>
      </ItemField>
    )
  }

  const date = new Date(createdAt)

  return (
    <ItemField propertyName="Created" {...itemFieldProps}>
      <Typography variant="base-regular" className="truncate">
        {isDate(date)
          ? intlFormat(date, SHORT_DATE_TIME_FORMAT_OPTIONS)
          : EMPTY_VALUE_FALLBACK}
      </Typography>
    </ItemField>
  )
}
ItemFieldCreated.displayName = "ItemFieldCreated"

export type ItemFieldProps = {
  propertyName: string
} & React.ComponentProps<"div">

export function ItemField(props: ItemFieldProps) {
  const { propertyName, children, className, ...divProps } = props

  return (
    <div className={cn("flex flex-col gap-1", className)} {...divProps}>
      <div className="text-muted-foreground">
        <Typography variant="base-semibold">{propertyName}</Typography>
      </div>
      {children}
    </div>
  )
}
ItemField.displayName = "ItemField"
