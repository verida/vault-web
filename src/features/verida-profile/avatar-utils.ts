import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("verida-profile")

// Maximum file size: 1MB
export const MAX_AVATAR_FILE_SIZE = 1 * 1024 * 1024
export const ALLOWED_AVATAR_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]
export const MAX_AVATAR_DIMENSION = 500 // Maximum width/height for the square image

/**
 * Validates an image file for use as an avatar
 * @param file The file to validate
 * @returns An object with validation result and error message if any
 */
export function validateAvatarFile(file: File): {
  isValid: boolean
  errorMessage?: string
} {
  // Validate file type
  if (!ALLOWED_AVATAR_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      errorMessage:
        "Please upload a valid image file (JPEG, PNG, WebP, or GIF)",
    }
  }

  // Validate file size
  if (file.size > MAX_AVATAR_FILE_SIZE) {
    return {
      isValid: false,
      errorMessage: "Image must be less than 1MB",
    }
  }

  return { isValid: true }
}

/**
 * Crops an image to a square and resizes it to the specified dimensions
 * @param image The image element to crop
 * @param maxDimension The maximum width/height for the output image
 * @returns A Promise that resolves to the cropped image as a data URL
 */
export function cropImageToSquare(
  image: HTMLImageElement,
  maxDimension = MAX_AVATAR_DIMENSION
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      // Calculate the square crop dimensions
      const size = Math.min(image.naturalWidth, image.naturalHeight)
      const startX = (image.naturalWidth - size) / 2
      const startY = (image.naturalHeight - size) / 2

      // Set canvas dimensions to our desired output size
      canvas.width = maxDimension
      canvas.height = maxDimension

      // Draw the cropped and resized image to the canvas
      ctx.drawImage(
        image,
        startX,
        startY,
        size,
        size,
        0,
        0,
        maxDimension,
        maxDimension
      )

      // Convert canvas to base64 data URL
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9)
      resolve(dataUrl)
    } catch (error) {
      logger.error("Error cropping image:", { tags: { error: String(error) } })
      reject(error)
    }
  })
}

/**
 * Creates an object URL for a file and returns a cleanup function
 * @param file The file to create an object URL for
 * @returns An object with the URL and a cleanup function
 */
export function createImagePreview(file: File): {
  previewUrl: string
  cleanup: () => void
} {
  const previewUrl = URL.createObjectURL(file)

  return {
    previewUrl,
    cleanup: () => {
      URL.revokeObjectURL(previewUrl)
    },
  }
}
