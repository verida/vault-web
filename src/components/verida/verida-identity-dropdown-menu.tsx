"use client"

import { MessageCircleIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type ComponentProps, useCallback } from "react"

import { ApiKeyIcon } from "@/components/icons/api-key-icon"
import { Copy } from "@/components/icons/copy"
import { Logout } from "@/components/icons/logout"
import { SimpleDown } from "@/components/icons/simple-down"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Typography } from "@/components/ui/typography"
import { featureFlags } from "@/config/features"
import { version } from "@/config/version"
import { APP_NAME, TERMS_AND_CONDITIONS_URL } from "@/constants/app"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useRestrictedAccess } from "@/features/restricted-access/hooks/use-restricted-access"
import {
  getAuthorizedAppsPageRoute,
  getProfilePageRoute,
} from "@/features/routes/utils"
import { useUserFeedback } from "@/features/telemetry/use-user-feedback"
import { useToast } from "@/features/toasts/use-toast"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useUserProfile } from "@/features/verida-profile/hooks/use-user-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export interface VeridaIdentityDropdownMenuProps
  extends Pick<ComponentProps<typeof Button>, "className"> {
  keepExpanded?: boolean
  displayNotConnectedSkeleton?: boolean
  hideDisconnect?: boolean
  hideAuthorizedApps?: boolean
  hideFeedback?: boolean
  hideProfile?: boolean
}

export function VeridaIdentityDropdownMenu(
  props: VeridaIdentityDropdownMenuProps
) {
  const {
    keepExpanded = false,
    displayNotConnectedSkeleton = false,
    hideDisconnect = false,
    hideAuthorizedApps = false,
    hideFeedback = false,
    hideProfile = false,
    className,
  } = props

  const router = useRouter()

  const { access } = useRestrictedAccess()
  const { isConnected, did, disconnect } = useVerida()
  const { profile, isLoading } = useUserProfile()

  const { openForm: openUserFeedbackForm, isReady: isUserFeedbackReady } =
    useUserFeedback()

  const { toast } = useToast()

  const handleCopyDid = useCallback(async () => {
    if (did && typeof window !== "undefined") {
      await window.navigator.clipboard.writeText(did)
      toast({
        variant: "success",
        description: "DID copied to clipboard",
      })
    }
  }, [did, toast])

  const handleAuthorizedAppsClick = useCallback(() => {
    router.push(getAuthorizedAppsPageRoute())
  }, [router])

  const handleProfileClick = useCallback(() => {
    router.push(getProfilePageRoute())
  }, [router])

  if (!isConnected && displayNotConnectedSkeleton) {
    return (
      <VeridaIdentityNotConnectedDropdownMenuButton className={className} />
    )
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
        <DropdownMenuLabel className="block rounded-none px-4 py-3">
          <div className="flex flex-row items-center gap-3">
            <ProfileAvatar
              profile={profile}
              isLoading={isLoading}
              className="size-12"
            />
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyDid}
                    className="-mx-2 flex flex-row items-center justify-center p-2"
                  >
                    <Copy width="100%" height="100%" className="size-5" />
                    <span className="sr-only">Click to copy DID</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy DID</TooltipContent>
              </Tooltip>
            ) : null}
          </div>
        </DropdownMenuLabel>
        {!hideProfile && (
          <IdentityDropdownMenuItem onClick={handleProfileClick}>
            <UserIcon className="size-5" />
            <Typography variant="base-semibold">Profile</Typography>
          </IdentityDropdownMenuItem>
        )}
        {access === "allowed" &&
        !hideAuthorizedApps &&
        featureFlags.veridaAuth.authorizedAppsUi.enabled ? (
          <IdentityDropdownMenuItem onClick={handleAuthorizedAppsClick}>
            <ApiKeyIcon className="size-5" />
            <Typography variant="base-semibold">Authorized Apps</Typography>
          </IdentityDropdownMenuItem>
        ) : null}
        {!hideFeedback && isUserFeedbackReady ? (
          <IdentityDropdownMenuItem onClick={openUserFeedbackForm}>
            <MessageCircleIcon />
            <Typography variant="base-semibold">Give your feedback</Typography>
          </IdentityDropdownMenuItem>
        ) : null}
        {!hideDisconnect ? (
          <IdentityDropdownMenuItem
            onClick={disconnect}
            disabled={!isConnected}
            className="text-destructive"
          >
            <Logout />
            <Typography variant="base-semibold">Disconnect</Typography>
          </IdentityDropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex flex-col items-center gap-0 rounded-none text-center text-xs font-normal">
          <span>{`${APP_NAME} ${version}`}</span>
          <Link
            href={TERMS_AND_CONDITIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Terms & Conditions
          </Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
VeridaIdentityDropdownMenu.displayName = "VeridaIdentityDropdownMenu"

interface VeridaIdentityNotConnectedDropdownMenuButtonProps
  extends Pick<ComponentProps<typeof Button>, "className"> {
  keepExpanded?: boolean
}

function VeridaIdentityNotConnectedDropdownMenuButton(
  props: VeridaIdentityNotConnectedDropdownMenuButtonProps
) {
  const { keepExpanded = false, className } = props

  return (
    <Button
      variant="outline"
      disabled
      className={cn(
        "h-auto max-w-56 border-0",
        keepExpanded
          ? "rounded-lg border py-2 pl-3 pr-2"
          : "rounded-full p-0 md:rounded-lg md:border md:py-2 md:pl-3 md:pr-2",
        className
      )}
    >
      <div className="flex w-full flex-row items-center gap-2">
        <div className="size-8 shrink-0 rounded-full border bg-surface-active" />
        <div>
          <Typography variant="base-semibold" className="italic">
            Not Connected
          </Typography>
        </div>
        <SimpleDown
          className={cn(
            "shrink-0 text-muted-foreground",
            keepExpanded ? "" : "hidden md:block"
          )}
        />
      </div>
    </Button>
  )
}

interface IdentityDropdownMenuItemProps
  extends ComponentProps<typeof DropdownMenuItem> {}

function IdentityDropdownMenuItem(props: IdentityDropdownMenuItemProps) {
  const { children, className, ...dropdownMenuItemProps } = props

  return (
    <DropdownMenuItem
      className={cn("gap-3 rounded-none px-4 py-4", className)}
      {...dropdownMenuItemProps}
    >
      {children}
    </DropdownMenuItem>
  )
}
IdentityDropdownMenuItem.displayName = "IdentityDropdownMenuItem"
