import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/features/toasts/use-toast"
import { VeridaProfileQueryKeys } from "@/features/verida-profile/queries"
import type { VeridaProfile } from "@/features/verida-profile/types"
import { updateVeridaProfile } from "@/features/verida-profile/utils"
import { VeridaNotConnectedError } from "@/features/verida/errors/verida-not-connected-error"
import { useVerida } from "@/features/verida/hooks/use-verida"

type UpdateProfileArgs = {
  profileToSave: VeridaProfile
}

type UpdateProfileMutationContext = {
  previousProfileData: VeridaProfile | undefined
}

export type UseUpdateVeridaProfileOptions = {
  disableOptimisticUpdate?: boolean
}

export function useUpdateVeridaProfile(
  options: UseUpdateVeridaProfileOptions = {}
) {
  const { toast } = useToast()

  const queryClient = useQueryClient()
  const { did, context } = useVerida()

  const { mutate, mutateAsync, ...mutation } = useMutation<
    VeridaProfile,
    Error,
    UpdateProfileArgs,
    UpdateProfileMutationContext
  >({
    mutationFn: async ({ profileToSave }) => {
      if (!did || !context) {
        throw new VeridaNotConnectedError()
      }

      return updateVeridaProfile({
        context,
        profileToSave,
      })
    },
    onMutate: async ({ profileToSave }) => {
      if (options.disableOptimisticUpdate || !did) {
        return {
          previousProfileData: undefined,
        }
      }

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: VeridaProfileQueryKeys.profile(did),
      })

      // Snapshot the previous value for the individual profile
      const previousProfileData = queryClient.getQueryData<VeridaProfile>(
        VeridaProfileQueryKeys.profile(did)
      )

      // Optimistically update to the new value for the individual profile
      if (previousProfileData) {
        queryClient.setQueryData(VeridaProfileQueryKeys.profile(did), {
          ...previousProfileData,
          ...profileToSave,
        })
      }

      return { previousProfileData }
    },
    onError: (_error, _variables, context) => {
      toast({
        variant: "error",
        description: "Updating your profile failed",
      })

      if (context?.previousProfileData) {
        queryClient.setQueryData(
          VeridaProfileQueryKeys.profile(did),
          context.previousProfileData
        )
      }
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        description: "Your profile has been updated successfully",
      })

      if (did) {
        queryClient.setQueryData(VeridaProfileQueryKeys.profile(did), data)
      }
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
