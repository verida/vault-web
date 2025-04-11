import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"

export function useUserProfile() {
  const { did, isConnected } = useVerida()

  const { profile, ...query } = useVeridaProfile({
    did,
    enabled: isConnected,
  })

  return {
    did,
    profile,
    ...query,
  }
}
