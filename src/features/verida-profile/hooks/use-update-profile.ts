import { useMutation, useQueryClient } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { useToast } from "@/features/toasts/use-toast"
import { invalidateVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import type { VeridaProfileFormData } from "@/features/verida-profile/types"
import { updateVeridaProfile } from "@/features/verida-profile/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-profile")

export function useUpdateProfile() {
  const { toast } = useToast()

  const queryClient = useQueryClient()
  const { did, webUserInstanceRef } = useVerida()

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: async (profileFormData: VeridaProfileFormData) => {
      if (!did) {
        throw new Error("DID is required to update profile")
      }

      return updateVeridaProfile({
        did,
        webUserInstance: webUserInstanceRef.current,
        network: commonConfig.VERIDA_NETWORK,
        rpcUrl: commonConfig.VERIDA_RPC_URL,
        profileToSave: profileFormData,
      })
    },
    onSuccess: () => {
      // Invalidate the profile query to refetch the updated profile
      if (did) {
        invalidateVeridaProfile(queryClient, did)
      }

      toast({
        variant: "success",
        description: "Your profile has been updated successfully",
      })
    },
    onError: () => {
      toast({
        variant: "error",
        description: "Updating your profile failed",
      })
    },
    meta: {
      logCategory: "verida-profile",
      errorMessage: "Failed to update Verida profile",
    },
  })

  return {
    updateProfile: mutate,
    updateProfileAsync: mutateAsync,
    ...mutation,
  }
}
