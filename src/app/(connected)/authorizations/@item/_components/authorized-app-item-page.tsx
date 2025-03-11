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
} from "@/components/layouts/item-sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Typography } from "@/components/ui/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import {
  RevokeAuthorizedAppDialog,
  RevokeAuthorizedAppDialogTrigger,
} from "@/features/authorized-apps/components/revoke-authorized-app-dialog"
import { VeridaAuthScope } from "@/features/verida-auth/components/verida-auth-scope"
import { useResolvedVeridaAuthScopes } from "@/features/verida-auth/hooks/use-resolved-verida-auth-scopes"
import { useVeridaAuthToken } from "@/features/verida-auth/hooks/use-verida-auth-token"
import { VeridaAuthScope as VeridaAuthScopeType } from "@/features/verida-auth/types"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { cn } from "@/styles/utils"
import { SHORT_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

export type AuthorizedAppItemPageContentProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemId: string
}

export function AuthorizedAppItemPageContent(
  props: AuthorizedAppItemPageContentProps
) {
  const { open, onOpenChange, itemId } = props

  const { authToken, isLoading, isError } = useVeridaAuthToken({
    tokenId: itemId,
  })

  const { profile, isLoading: isLoadingProfile } = useVeridaProfile({
    did: authToken?.appDID,
  })

  const { resolvedScopes } = useResolvedVeridaAuthScopes(
    authToken?.scopes ?? []
  )

  const apiScopes = useMemo(() => {
    return resolvedScopes?.filter((scope) => scope.type === "api")
  }, [resolvedScopes])

  const dataScopes = useMemo(() => {
    return resolvedScopes?.filter((scope) => scope.type === "data")
  }, [resolvedScopes])

  const unknownScopes = useMemo(() => {
    return resolvedScopes?.filter((scope) => scope.type === "unknown")
  }, [resolvedScopes])

  const handleClose = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const handleRevoke = useCallback(() => {
    handleClose()
  }, [handleClose])

  const body = useMemo(() => {
    if (authToken) {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <ProfileAvatar
              profile={profile}
              isLoading={isLoadingProfile}
              className="size-12"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-0">
              {authToken?.appDID ? (
                <Typography variant="base-regular" className="truncate">
                  <span
                    className={cn(
                      profile?.name ? "" : "italic text-muted-foreground"
                    )}
                  >
                    {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
                  </span>
                </Typography>
              ) : (
                <Typography variant="base-regular" className="truncate">
                  <span className="italic text-muted-foreground">
                    {`<Not linked to an Application>`}
                  </span>
                </Typography>
              )}
              <div className="text-muted-foreground">
                <Typography variant="base-s-regular" className="truncate">
                  {authToken?.appDID ?? EMPTY_VALUE_FALLBACK}
                </Typography>
              </div>
            </div>
          </div>
          {resolvedScopes && resolvedScopes.length > 0 ? (
            <Accordion
              type="multiple"
              defaultValue={["data-scopes", "api-scopes"]}
            >
              {dataScopes && dataScopes.length > 0 ? (
                <AccordionItem value="data-scopes">
                  <AccordionTrigger>Data</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-inside list-disc">
                      {dataScopes.map((scope, index) => (
                        <li key={index}>
                          <Typography variant="base-regular" component="span">
                            <VeridaAuthScope scope={scope} />
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : null}
              {apiScopes && apiScopes.length > 0 ? (
                <AccordionItem value="api-scopes">
                  <AccordionTrigger>Operations</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2">
                    <ul className="list-inside list-disc">
                      {apiScopes.map((scope, index) => (
                        <li key={index}>
                          <Typography variant="base-regular" component="span">
                            <VeridaAuthScope scope={scope} />
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : null}
              {unknownScopes && unknownScopes.length > 0 ? (
                <AccordionItem value="unknown-scopes">
                  <AccordionTrigger>Other</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-inside list-disc">
                      {unknownScopes.map((scope, index) => (
                        <li key={index}>
                          <Typography variant="base-regular" component="span">
                            <VeridaAuthScope scope={scope} />
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : null}
            </Accordion>
          ) : (
            <div className="text-muted-foreground">
              <Typography variant="base-regular">
                No access requested
              </Typography>
            </div>
          )}
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
  }, [
    authToken,
    isLoading,
    isError,
    profile,
    isLoadingProfile,
    resolvedScopes,
    apiScopes,
    dataScopes,
    unknownScopes,
  ])

  return (
    <ItemSheet open={open} onOpenChange={onOpenChange}>
      <ItemSheetContent>
        <ItemSheetHeader
          right={
            authToken ? (
              <Tooltip>
                <RevokeAuthorizedAppDialog
                  authToken={authToken}
                  onRevoke={handleRevoke}
                >
                  <RevokeAuthorizedAppDialogTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button variant="outline-destructive" size="icon">
                        <DeleteIcon className="size-5 shrink-0" />
                        <span className="sr-only">Revoke</span>
                      </Button>
                    </TooltipTrigger>
                  </RevokeAuthorizedAppDialogTrigger>
                </RevokeAuthorizedAppDialog>
                <TooltipContent>Revoke</TooltipContent>
              </Tooltip>
            ) : undefined
          }
        >
          <ItemSheetTitle description="Authorized app">
            Authorized app
          </ItemSheetTitle>
        </ItemSheetHeader>
        <ItemSheetBody>{body}</ItemSheetBody>
        <ItemSheetFooter className="flex flex-col gap-4">
          <Button variant="outline" className="w-full" onClick={handleClose}>
            Close
          </Button>
        </ItemSheetFooter>
      </ItemSheetContent>
    </ItemSheet>
  )
}
AuthorizedAppItemPageContent.displayName = "AuthorizedAppItemPageContent"

export interface ItemFieldUrlProps
  extends Omit<
    React.ComponentProps<typeof ItemField>,
    "propertyName" | "children"
  > {
  url?: string
}

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

export interface ItemFieldScopesProps
  extends Omit<
    React.ComponentProps<typeof ItemField>,
    "propertyName" | "children"
  > {
  scopes?: VeridaAuthScopeType[]
}

export function ItemFieldScopes(props: ItemFieldScopesProps) {
  const { scopes, ...itemFieldProps } = props

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
          <li key={index}>
            <Typography variant="base-regular">{scope.description}</Typography>
          </li>
        ))}
      </ul>
    </ItemField>
  )
}
ItemFieldScopes.displayName = "ItemFieldScopes"

export interface ItemFieldLastUsedProps
  extends Omit<
    React.ComponentProps<typeof ItemField>,
    "propertyName" | "children"
  > {
  lastUsed?: string
}

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

export interface ItemFieldCreatedProps
  extends Omit<
    React.ComponentProps<typeof ItemField>,
    "propertyName" | "children"
  > {
  createdAt?: string
}

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

export interface ItemFieldProps extends React.ComponentProps<"div"> {
  propertyName: string
}

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
