import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { VeridaProfile } from "@/features/verida-profile/types"
import { cn } from "@/styles/utils"

type ProfileAvatarProps = {
  profile: VeridaProfile | undefined | null
  isLoading?: boolean
} & Omit<React.ComponentProps<typeof Avatar>, "children">

export function ProfileAvatar(props: ProfileAvatarProps) {
  const { profile, isLoading, className, ...avatarProps } = props

  return (
    <Avatar className={cn("size-10", className)} {...avatarProps}>
      {profile ? (
        <>
          <AvatarImage alt="Avatar" src={profile.avatar?.uri} />
          <AvatarFallback>
            {profile.name?.at(0)?.toUpperCase() || EMPTY_VALUE_FALLBACK}
          </AvatarFallback>
        </>
      ) : isLoading ? (
        <Skeleton className="h-full w-full rounded-full" />
      ) : (
        <AvatarFallback>{EMPTY_VALUE_FALLBACK}</AvatarFallback>
      )}
    </Avatar>
  )
}
ProfileAvatar.displayName = "ProfileAvatar"
