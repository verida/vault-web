import { useMemo } from "react"

import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"

export function useUserProfile() {
  const { did } = useVerida()

  const { profile, ...query } = useVeridaProfile(did)

  const resolvedProfile = useMemo(() => {
    return did ? profile : undefined
  }, [did, profile])

  return {
    did,
    profile: resolvedProfile,
    ...query,
  }
}
