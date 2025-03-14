"use client"

import { useCallback, useEffect, useRef } from "react"

import { DeleteIcon } from "@/components/icons/delete-icon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useFormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingBlock, LoadingBlockSpinner } from "@/components/ui/loading"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { ALLOWED_AVATAR_FILE_TYPES } from "@/features/verida-profile/avatar-utils"
import { AvatarCropDialog } from "@/features/verida-profile/components/avatar-crop-dialog"
import { useAvatarUpload } from "@/features/verida-profile/hooks/use-avatar-upload"
import { cn } from "@/styles/utils"

export interface AvatarUploadInputProps {
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  onError: (error: string | undefined) => void
}

export function AvatarUploadInput(props: AvatarUploadInputProps) {
  const { value, onValueChange } = props

  const { formItemId } = useFormField()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    handleSelectedFileChange: handleFileChange,
    newAvatarUri,
    isDialogOpen,
    selectedImageUrl,
    handleCropImage,
    handleCancelCrop,
    // validationError,
    isConverting,
    clear,
  } = useAvatarUpload()

  useEffect(() => {
    if (newAvatarUri) {
      onValueChange(newAvatarUri)
    }
  }, [newAvatarUri, onValueChange])

  // useEffect(() => {
  //   onError(validationError)
  // }, [validationError, onError])

  const handleClearAvatar = useCallback(() => {
    clear()
    onValueChange(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [onValueChange, clear])

  const handleAvatarClick = useCallback(() => {
    if (!isConverting && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [isConverting])

  return (
    <div className="relative flex flex-col items-center gap-4 sm:flex-row">
      <input
        ref={fileInputRef}
        id={formItemId}
        type="file"
        accept={ALLOWED_AVATAR_FILE_TYPES.join(",")}
        onChange={handleFileChange}
        className="absolute left-0 top-0 hidden size-24 rounded-full border-none"
        disabled={isConverting}
      />
      <div className="relative">
        <button
          id={formItemId}
          type="button"
          onClick={handleAvatarClick}
          className={cn(
            "group cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0",
            isConverting ? "pointer-events-none" : ""
          )}
        >
          <Avatar className="size-24 transition-colors group-hover:border-border-hover">
            {isConverting ? (
              <div className="flex h-full w-full items-center justify-center">
                <LoadingBlock>
                  <LoadingBlockSpinner className="size-8" />
                </LoadingBlock>
              </div>
            ) : (
              <>
                <AvatarImage src={value} alt="Profile avatar" />
                <AvatarFallback>{EMPTY_VALUE_FALLBACK}</AvatarFallback>
              </>
            )}
          </Avatar>
          <span className="sr-only">Upload avatar</span>
        </button>
        {value && !isConverting ? (
          <Button
            type="button"
            variant="outline-destructive"
            size="icon"
            className="absolute bottom-0 right-0 size-8 translate-x-1/3 rounded-full"
            onClick={handleClearAvatar}
          >
            <DeleteIcon className="size-4" />
            <span className="sr-only">Clear avatar</span>
          </Button>
        ) : null}
      </div>
      <AvatarCropDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => !open && handleCancelCrop()}
        imageUrl={selectedImageUrl}
        onCrop={handleCropImage}
        onCancel={handleCancelCrop}
      />
    </div>
  )
}
AvatarUploadInput.displayName = "AvatarUploadInput"
