import Link from "next/link"
import { ComponentProps } from "react"

import { Typography } from "@/components/typography"
import { Skeleton } from "@/components/ui/skeleton"
import { getVeridaExplorerIdentityPageUrl } from "@/features/verida-explorer/utils"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { UserYourselfBadge } from "@/features/verida-profile/components/user-yourself-badge"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export interface RequestHeaderProps extends ComponentProps<"div"> {
  requesterDid?: string | null
}

export function RequestHeader(props: RequestHeaderProps) {
  const { requesterDid, className, ...divProps } = props

  const { did } = useVerida()
  const { profile, isLoading } = useVeridaProfile({
    did: requesterDid,
  })

  return (
    <div
      className={cn("flex flex-row items-center gap-2", className)}
      {...divProps}
    >
      <ProfileAvatar
        profile={profile}
        isLoading={isLoading}
        className="size-12"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-row gap-1.5">
          {!requesterDid || profile ? (
            <>
              <div
                className={cn(
                  "min-w-0",
                  profile?.name ? "" : "italic text-muted-foreground"
                )}
              >
                <Typography variant="heading-5" className="h-6 truncate">
                  {profile?.name || EMPTY_PROFILE_NAME_FALLBACK}
                </Typography>
              </div>
            </>
          ) : (
            <Skeleton className="my-1 h-4 w-36" />
          )}
          {did === requesterDid && <UserYourselfBadge className="self-start" />}
        </div>
        {requesterDid ? (
          <Link
            href={getVeridaExplorerIdentityPageUrl(requesterDid)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <Typography variant="base-s-regular" className="truncate">
              {requesterDid}
            </Typography>
          </Link>
        ) : (
          <div className="text-muted-foreground">
            <Typography variant="base-s-regular">
              Be careful with this unknown requester
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
RequestHeader.displayName = "RequestHeader"
