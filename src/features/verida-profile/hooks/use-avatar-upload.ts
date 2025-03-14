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
  newAvatarUri: string | null
  isDialogOpen: boolean
  selectedImageUrl: string | null
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCropImage: (imageElement: HTMLImageElement) => Promise<void>
  handleCancelCrop: () => void
  validationError: string | undefined
}

/**
 * Hook for handling avatar upload operations
 * @returns Methods and state for avatar upload
 */
export function useAvatarUpload(): UseAvatarUploadReturn {
  const [newAvatarUri, setNewAvatarUri] = useState<string | null>(null)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined
  )

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }

      // Validate the file
      const validation = validateAvatarFile(file)
      if (!validation.isValid) {
        setValidationError(validation.errorMessage || "Invalid file")
        return
      }

      setValidationError(undefined)

      // Create a temporary URL for the image
      const { previewUrl, cleanup } = createImagePreview(file)
      setSelectedImageUrl(previewUrl)
      setDialogOpen(true)

      // Store the cleanup function to be called when the component unmounts
      return cleanup
    },
    []
  )

  const handleCropImage = useCallback(
    async (imageElement: HTMLImageElement) => {
      try {
        const imageDataUri = await cropImageToSquare(imageElement)
        setNewAvatarUri(imageDataUri)
        setValidationError(undefined)

        // Clean up
        setDialogOpen(false)
        if (selectedImageUrl) {
          URL.revokeObjectURL(selectedImageUrl)
          setSelectedImageUrl(null)
        }

        logger.debug("Avatar cropped successfully")
      } catch (error) {
        logger.error(error)
        setValidationError("Error processing image. Please try again.")
      }
    },
    [selectedImageUrl]
  )

  const handleCancelCrop = useCallback(() => {
    setDialogOpen(false)
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl)
      setSelectedImageUrl(null)
    }
  }, [selectedImageUrl])

  return {
    newAvatarUri,
    isDialogOpen,
    selectedImageUrl,
    handleFileChange,
    handleCropImage,
    handleCancelCrop,
    validationError,
  }
}
