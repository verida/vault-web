import { useVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { useVerida } from "@/features/verida/hooks/use-verida"

export function useUserProfile() {
  const { did } = useVerida()

  const query = useVeridaProfile(did)

  return {
    did,
    ...query,
  }
}
