import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"

export function useUserProfile() {
  const { did, status } = useVerida()

  const { profile, ...query } = useVeridaProfile({
    did,
    enabled: status === "connected",
  })

  return {
    did,
    profile,
    ...query,
  }
}
