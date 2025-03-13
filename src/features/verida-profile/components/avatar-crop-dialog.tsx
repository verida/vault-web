"use client"

import Image from "next/image"
import { useCallback, useRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface AvatarCropDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  imageUrl: string | null
  onCrop: (imageElement: HTMLImageElement) => Promise<void>
  onCancel: () => void
}

export function AvatarCropDialog(props: AvatarCropDialogProps) {
  const { isOpen, onOpenChange, imageUrl, onCrop, onCancel } = props

  const imageRef = useRef<HTMLImageElement>(null)

  const handleCrop = useCallback(async () => {
    if (imageRef.current) {
      await onCrop(imageRef.current)
    }
  }, [onCrop])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crop Profile Picture</DialogTitle>
          <DialogDescription>
            Your image will be cropped to a square. Position it as needed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          {imageUrl && (
            <div className="relative mb-4 overflow-hidden">
              <Image
                ref={imageRef}
                src={imageUrl}
                width={300}
                height={300}
                alt="Preview"
                className="max-h-[300px] max-w-full object-contain"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleCrop}>
            Crop & Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
AvatarCropDialog.displayName = "AvatarCropDialog"
