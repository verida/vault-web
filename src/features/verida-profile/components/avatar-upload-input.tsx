"use client"

import { useEffect } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFormField } from "@/components/ui/form"
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
  const { value, onValueChange } = props

  const { formItemId } = useFormField()

  const {
    avatarPreview,
    isDialogOpen,
    tempImageUrl,
    handleFileChange,
    handleCropImage,
    handleCancelCrop,
    // validationError,
  } = useAvatarUpload()

  useEffect(() => {
    if (avatarPreview) {
      onValueChange(avatarPreview)
    }
  }, [avatarPreview, onValueChange])

  // useEffect(() => {
  //   onError(validationError)
  // }, [validationError, onError])

  return (
    <div className="relative flex flex-col items-center gap-4 sm:flex-row">
      <Input
        id={formItemId}
        type="file"
        accept={ALLOWED_AVATAR_FILE_TYPES.join(",")}
        onChange={handleFileChange}
        containerClassName="absolute top-0 left-0"
        className="size-24 rounded-full opacity-100"
      />
      <label htmlFor={formItemId}>
        <Avatar className="size-24">
          <AvatarImage src={value} alt="Profile avatar" />
          <AvatarFallback>{EMPTY_VALUE_FALLBACK}</AvatarFallback>
        </Avatar>
      </label>
      <AvatarCropDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => !open && handleCancelCrop()}
        imageUrl={tempImageUrl}
        onCrop={handleCropImage}
        onCancel={handleCancelCrop}
      />
    </div>
  )
}
AvatarUploadInput.displayName = "AvatarUploadInput"
