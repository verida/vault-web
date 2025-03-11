/* eslint-disable react-hooks/rules-of-hooks */
import { createColumnHelper } from "@tanstack/react-table"

import { Typography } from "@/components/ui/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { VeridaAuthScope } from "@/features/verida-auth/components/verida-auth-scope"
import { useResolvedVeridaAuthScopes } from "@/features/verida-auth/hooks/use-resolved-verida-auth-scopes"
import type { VeridaAuthToken } from "@/features/verida-auth/types"
import { ProfileAvatar } from "@/features/verida-profile/components/profile-avatar"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/verida-profile/constants"
import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { cn } from "@/styles/utils"

const columnHelper = createColumnHelper<VeridaAuthToken>()

export const authorizedAppsTableColumns = [
  columnHelper.accessor((row) => row._id, {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor((row) => row.appDID, {
    id: "application",
    header: "Application",
    meta: {
      headerClassName: "md:w-80 w-full shrink-0",
      cellClassName: "md:w-80 w-full",
    },
    cell: (context) => {
      const appDID = context.getValue()

      const { profile, isLoading } = useVeridaProfile({
        did: appDID,
      })

      return (
        <div className="flex flex-row items-center gap-2">
          <ProfileAvatar
            profile={profile}
            isLoading={isLoading}
            className="size-12"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-0">
            {appDID ? (
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
                {appDID ?? EMPTY_VALUE_FALLBACK}
              </Typography>
            </div>
          </div>
        </div>
      )
    },
  }),
  columnHelper.accessor((row) => row.scopes, {
    id: "scopes",
    header: "Authorizations",
    meta: {
      headerClassName: "flex-1",
    },
    cell: (context) => {
      const scopes = context.getValue()

      const { resolvedScopes } = useResolvedVeridaAuthScopes(scopes)

      if (!scopes || !resolvedScopes || resolvedScopes.length === 0) {
        return (
          <div className="text-muted-foreground">
            <Typography variant="base-regular" className="truncate">
              {EMPTY_VALUE_FALLBACK}
            </Typography>
          </div>
        )
      }

      return (
        <ul className="flex flex-col gap-0">
          {resolvedScopes
            .slice(0, resolvedScopes.length > 3 ? 2 : 3)
            .map((scope, index) => (
              <li key={index}>
                <Typography variant="base-regular" component="span">
                  <VeridaAuthScope scope={scope} />
                </Typography>
              </li>
            ))}
          {resolvedScopes.length > 3 && (
            <li>
              <Typography variant="base-regular" component="span">
                ...
              </Typography>
            </li>
          )}
        </ul>
      )
    },
  }),
]
