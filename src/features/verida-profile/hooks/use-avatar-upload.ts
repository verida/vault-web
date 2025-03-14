"use client"

import { useCallback, useState } from "react"

import { Logger } from "@/features/telemetry/logger"
import {
  convertImage,
  createImagePreview,
  cropImageToSquare,
  validateAvatarFile,
} from "@/features/verida-profile/avatar-utils"

const logger = Logger.create("verida-profile")

interface UseAvatarUploadReturn {
  handleSelectedFileChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<() => void>
  isConverting: boolean
  selectedImageUrl: string | null
  isDialogOpen: boolean
  handleCropImage: (imageElement: HTMLImageElement) => Promise<void>
  handleCancelCrop: () => void
  newAvatarUri: string | null
  validationError: string | undefined
  clear: () => void
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
  const [isConverting, setIsConverting] = useState(false)

  const handleSelectedFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        return () => {}
      }

      // Set a loading state while we process the file
      setIsConverting(true)
      setValidationError(undefined)

      try {
        // Convert file when needed and possible
        const processedFile = await convertImage(file)

        // Validate the processed file
        const validation = validateAvatarFile(processedFile)
        if (!validation.isValid) {
          setValidationError(validation.errorMessage || "Invalid file")
          setIsConverting(false)
          return () => {}
        }

        // Create a temporary URL for the image
        const { previewUrl, cleanup } = createImagePreview(processedFile)
        setSelectedImageUrl(previewUrl)
        setDialogOpen(true)
        setIsConverting(false)

        return cleanup
      } catch (error) {
        logger.error(new Error("Error processing image file", { cause: error }))

        setValidationError(
          "Error processing image. Please try a different file."
        )
        setIsConverting(false)
        return () => {}
      }
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

  const clear = useCallback(() => {
    setNewAvatarUri(null)
    setSelectedImageUrl(null)
    setValidationError(undefined)
    setDialogOpen(false)
    setIsConverting(false)
  }, [])

  return {
    handleSelectedFileChange,
    isConverting,
    selectedImageUrl,
    isDialogOpen,
    handleCropImage,
    handleCancelCrop,
    newAvatarUri,
    validationError,
    clear,
  }
}
