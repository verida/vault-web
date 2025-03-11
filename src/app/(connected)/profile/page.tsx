"use client"

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
import { ProfileCard } from "@/features/verida-profile/components/profile-card"
import { useUserProfile } from "@/features/verida-profile/hooks/use-user-profile"

export default function ProfilePage() {
  const { profile, did, isLoading } = useUserProfile()

  if (profile && did) {
    return (
      <div className="flex flex-1 flex-col items-center justify-start">
        <ProfileCard profile={profile} did={did} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle>Loading profile...</LoadingBlockTitle>
          <LoadingBlockDescription>
            Please wait while we are getting your profile information
          </LoadingBlockDescription>
        </LoadingBlock>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <ErrorBlock>
        <ErrorBlockImage />
        <ErrorBlockTitle>Error loading profile</ErrorBlockTitle>
        <ErrorBlockDescription>
          There was an error loading your profile information. Please try again
          later.
        </ErrorBlockDescription>
      </ErrorBlock>
    </div>
  )
}
ProfilePage.displayName = "ProfilePage"
