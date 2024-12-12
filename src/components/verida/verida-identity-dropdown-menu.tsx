"use client"

import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"

import { ApiKeyIcon } from "@/components/icons/api-key-icon"
import { Copy } from "@/components/icons/copy"
import { Logout } from "@/components/icons/logout"
import { SimpleDown } from "@/components/icons/simple-down"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { featureFlags } from "@/config/features"
import { version } from "@/config/version"
import { APP_NAME } from "@/constants/app"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { getApiKeysPageRoute } from "@/features/routes/utils"
import { useUserFeedback } from "@/features/telemetry/use-user-feedback"
import { useToast } from "@/features/toasts/use-toast"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useUserProfile } from "@/features/verida-profile/hooks/use-user-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

type VeridaIdentityDropdownMenuProps = {
  keepExpanded?: boolean
  hideDisconnect?: boolean
  hideApiKeys?: boolean
  hideFeedback?: boolean
} & Pick<React.ComponentProps<typeof Button>, "className">

export function VeridaIdentityDropdownMenu(
  props: VeridaIdentityDropdownMenuProps
) {
  const {
    keepExpanded = false,
    hideDisconnect = false,
    hideApiKeys = false,
    hideFeedback = false,
    className,
  } = props

  const router = useRouter()

  const { isConnected, did, disconnect } = useVerida()
  const { profile } = useUserProfile()

  const { openForm: openUserFeedbackForm, isReady: isUserFeedbackReady } =
    useUserFeedback()

  const { toast } = useToast()

  const handleCopyDid = useCallback(async () => {
    if (did) {
      await window.navigator.clipboard.writeText(did)
      toast({
        variant: "success",
        description: "DID copied to clipboard",
      })
    }
  }, [did, toast])

  const handleApiKeysClick = useCallback(() => {
    router.push(getApiKeysPageRoute())
  }, [router])

  if (!isConnected) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-auto max-w-56 border-0",
            keepExpanded
              ? "rounded-lg border py-2 pl-3 pr-2"
              : "rounded-full p-0 md:rounded-lg md:border md:py-2 md:pl-3 md:pr-2",
            className
          )}
        >
          <div className="flex w-full flex-row items-center gap-2">
            {profile ? (
              <>
                <Avatar className="size-8">
                  <AvatarImage alt="User Avatar" src={profile.avatar?.uri} />
                  <AvatarFallback>
                    {profile.name?.at(0)?.toUpperCase() || EMPTY_VALUE_FALLBACK}
                  </AvatarFallback>
                </Avatar>
                <p
                  className={cn(
                    "flex-1 truncate text-base font-semibold leading-5 text-muted-foreground",
                    keepExpanded ? "" : "hidden md:block",
                    profile.name ? "" : "italic"
                  )}
                >
                  {profile.name || EMPTY_PROFILE_NAME_FALLBACK}
                </p>
              </>
            ) : (
              <>
                <Skeleton className="size-8 shrink-0 rounded-full border" />
                <Skeleton
                  className={cn(
                    "my-0.5 h-4 w-24",
                    keepExpanded ? "" : "hidden md:block"
                  )}
                />
              </>
            )}
            <SimpleDown
              className={cn(
                "shrink-0 text-muted-foreground",
                keepExpanded ? "" : "hidden md:block"
              )}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-screen max-w-80 rounded-xl p-0 text-muted-foreground"
        align="end"
      >
        <DropdownMenuItem className="block px-4 py-3" onClick={handleCopyDid}>
          <div className="flex flex-row items-center gap-3">
            {profile ? (
              <Avatar className="size-12">
                <AvatarImage alt="User Avatar" src={profile.avatar?.uri} />
                <AvatarFallback>
                  {profile.name?.at(0)?.toUpperCase() || EMPTY_VALUE_FALLBACK}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="size-12 shrink-0 rounded-full border" />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              {profile ? (
                <p
                  className={cn(
                    "truncate text-base font-semibold leading-snug",
                    profile.name ? "" : "italic"
                  )}
                >
                  {profile.name || EMPTY_PROFILE_NAME_FALLBACK}
                </p>
              ) : (
                <Skeleton className="h-4 w-full" />
              )}
              {did ? (
                <div className="text-muted-foreground">
                  <Typography
                    variant="base-s-regular"
                    className="truncate leading-normal"
                  >
                    {did}
                  </Typography>
                </div>
              ) : (
                <Skeleton className="my-0.5 h-3 w-12" />
              )}
            </div>
            {did ? (
              <div className="-mx-2 flex cursor-pointer flex-row items-center justify-center rounded-md p-2">
                <Copy width="100%" height="100%" className="size-5" />
                <span className="sr-only">Click to copy DID</span>
              </div>
            ) : null}
          </div>
        </DropdownMenuItem>
        {!hideApiKeys && featureFlags.apiKeys.enabled ? (
          <DropdownMenuItem
            onClick={handleApiKeysClick}
            className="cursor-pointer gap-3 px-4 py-4"
          >
            <ApiKeyIcon className="size-5" />
            <Typography variant="base-semibold">API Keys</Typography>
          </DropdownMenuItem>
        ) : null}
        {!hideFeedback && isUserFeedbackReady ? (
          <DropdownMenuItem
            onClick={openUserFeedbackForm}
            className="cursor-pointer gap-3 px-4 py-4 text-muted-foreground"
          >
            <MessageCircle />
            <Typography variant="base-semibold">Give your feedback</Typography>
          </DropdownMenuItem>
        ) : null}
        {!hideDisconnect ? (
          <DropdownMenuItem
            onClick={disconnect}
            disabled={!isConnected}
            className="cursor-pointer gap-3 px-4 py-4 text-destructive"
          >
            <Logout />
            <Typography variant="base-semibold">Disconnect</Typography>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuLabel className="text-center text-xs font-normal">
          {`${APP_NAME} ${version}`}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
VeridaIdentityDropdownMenu.displayName = "VeridaIdentityDropdownMenu"
