"use client"

import { useEffect } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { ALLOWED_AVATAR_FILE_TYPES } from "@/features/verida-profile/avatar-utils"
import { AvatarCropDialog } from "@/features/verida-profile/components/avatar-crop-dialog"
import { useAvatarUpload } from "@/features/verida-profile/hooks/use-avatar-upload"

export interface AvatarUploadInputProps {
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  onError: (error: string | undefined) => void
}

export function AvatarUploadInput(props: AvatarUploadInputProps) {
  const { value, onValueChange, onError } = props

  const {
    avatarPreview,
    isDialogOpen,
    tempImageUrl,
    handleFileChange,
    handleCropImage,
    handleCancelCrop,
    validationError,
  } = useAvatarUpload()

  useEffect(() => {
    if (avatarPreview) {
      onValueChange(avatarPreview)
    }
  }, [avatarPreview, onValueChange])

  useEffect(() => {
    onError(validationError)
  }, [validationError, onError])

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="size-24">
          <AvatarImage src={value} alt="Profile avatar" />
          <AvatarFallback>{EMPTY_VALUE_FALLBACK}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          type="file"
          accept={ALLOWED_AVATAR_FILE_TYPES.join(",")}
          onChange={handleFileChange}
          className="w-full"
        />
        <AvatarCropDialog
          isOpen={isDialogOpen}
          onOpenChange={(open) => !open && handleCancelCrop()}
          imageUrl={tempImageUrl}
          onCrop={handleCropImage}
          onCancel={handleCancelCrop}
        />
      </div>
    </div>
  )
}
AvatarUploadInput.displayName = "AvatarUploadInput"
