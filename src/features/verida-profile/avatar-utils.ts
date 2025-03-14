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
 * Processes an image from the crop dialog and ensures it's a proper square
 * @param image The image element from the crop dialog
 * @returns A Promise that resolves to the processed image as a data URL
 */
export function cropImageToSquare(image: HTMLImageElement): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      // Get the natural dimensions of the image (this is the cropped square from the dialog)
      const { naturalWidth, naturalHeight } = image

      // The image should already be square from the crop dialog
      // But we'll ensure it's square just in case
      const size = Math.min(naturalWidth, naturalHeight)

      // Set canvas dimensions to preserve the original resolution
      canvas.width = size
      canvas.height = size

      // Draw the image to the canvas
      ctx.drawImage(image, 0, 0, size, size, 0, 0, size, size)

      // Convert canvas to base64 data URL with high quality
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92)
      resolve(dataUrl)
    } catch (error) {
      logger.error("Error processing cropped image:", {
        tags: { error: String(error) },
      })
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
