"use client"

import { useCallback, useState } from "react"

import { Logger } from "@/features/telemetry/logger"
import {
  createImagePreview,
  cropImageToSquare,
  validateAvatarFile,
} from "@/features/verida-profile/avatar-utils"

const logger = Logger.create("verida-profile")

interface UseAvatarUploadReturn {
  avatarPreview: string | null
  isDialogOpen: boolean
  tempImageUrl: string | null
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCropImage: (imageElement: HTMLImageElement) => Promise<void>
  handleCancelCrop: () => void
  setAvatarPreview: (preview: string | null) => void
  validationError: string | undefined
}

/**
 * Hook for handling avatar upload operations
 * @returns Methods and state for avatar upload
 */
export function useAvatarUpload(): UseAvatarUploadReturn {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined
  )

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Validate the file
      const validation = validateAvatarFile(file)
      if (!validation.isValid) {
        setValidationError(validation.errorMessage || "Invalid file")
        return
      }

      setValidationError(undefined)

      // Create a temporary URL for the image
      const { previewUrl, cleanup } = createImagePreview(file)
      setTempImageUrl(previewUrl)
      setDialogOpen(true)

      // Store the cleanup function to be called when the component unmounts
      return cleanup
    },
    []
  )

  const handleCropImage = useCallback(
    async (imageElement: HTMLImageElement) => {
      try {
        const dataUrl = await cropImageToSquare(imageElement)
        setAvatarPreview(dataUrl)
        setValidationError(undefined)

        // Clean up
        setDialogOpen(false)
        if (tempImageUrl) {
          URL.revokeObjectURL(tempImageUrl)
          setTempImageUrl(null)
        }

        logger.debug("Avatar cropped successfully")
      } catch (error) {
        logger.error(error)
        setValidationError("Error processing image. Please try again.")
      }
    },
    [tempImageUrl]
  )

  const handleCancelCrop = useCallback(() => {
    setDialogOpen(false)
    if (tempImageUrl) {
      URL.revokeObjectURL(tempImageUrl)
      setTempImageUrl(null)
    }
  }, [tempImageUrl])

  return {
    avatarPreview,
    isDialogOpen,
    tempImageUrl,
    handleFileChange,
    handleCropImage,
    handleCancelCrop,
    setAvatarPreview,
    validationError,
  }
}
