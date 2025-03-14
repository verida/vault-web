"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ErrorBlock, ErrorBlockTitle } from "@/components/ui/error"
import { LoadingBlock, LoadingBlockSpinner } from "@/components/ui/loading"
import { Slider } from "@/components/ui/slider"
import { Logger } from "@/features/telemetry/logger"
import { cn } from "@/styles/utils"

const logger = Logger.create("verida-profile")

// Constants for zoom
const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.01

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
  const containerRef = useRef<HTMLDivElement>(null)

  // State for tracking image position, zoom, and dragging
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [baseZoom, setBaseZoom] = useState(1) // Base zoom to fit image in container
  const [zoomFactor, setZoomFactor] = useState(1) // Multiplier applied to baseZoom
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  })

  // Handle image load to center it initially and set dimensions
  const handleImageLoad = useCallback(() => {
    if (!imageRef.current || !containerRef.current) {
      return
    }

    const img = imageRef.current
    const container = containerRef.current
    const containerSize = container.clientWidth

    // Store original image dimensions
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    setImageDimensions({ width: imgWidth, height: imgHeight })

    // Calculate initial scale to fit the smaller dimension to the container
    const scale = Math.max(containerSize / imgWidth, containerSize / imgHeight)
    const scaledWidth = imgWidth * scale
    const scaledHeight = imgHeight * scale

    // Center the image initially
    const initialX = (containerSize - scaledWidth) / 2
    const initialY = (containerSize - scaledHeight) / 2

    // Set initial position and zoom
    setPosition({ x: initialX, y: initialY })
    setBaseZoom(scale)
    setZoom(scale) // Initial zoom is the base zoom
    setZoomFactor(1) // Start with no additional zoom
    setImageLoaded(true)
  }, [])

  // Constrain position to ensure image covers the crop area
  const constrainPosition = useCallback(
    (x: number, y: number, currentZoom: number) => {
      if (!imageRef.current || !containerRef.current) {
        return { x, y }
      }

      const container = containerRef.current
      const containerSize = container.clientWidth

      const imgWidth = imageDimensions.width * currentZoom
      const imgHeight = imageDimensions.height * currentZoom

      // Calculate bounds to ensure image covers the crop area
      const minX = containerSize - imgWidth
      const minY = containerSize - imgHeight
      const maxX = 0
      const maxY = 0

      return {
        x: Math.min(maxX, Math.max(minX, x)),
        y: Math.min(maxY, Math.max(minY, y)),
      }
    },
    [imageDimensions]
  )

  // Handle zoom change from slider
  const handleZoomChange = useCallback(
    (value: number[]) => {
      if (!imageRef.current || !containerRef.current) {
        return
      }

      const newZoomFactor = value[0]
      const newZoom = baseZoom * newZoomFactor
      const container = containerRef.current
      const containerSize = container.clientWidth

      // Calculate the center point of the container
      const centerX = containerSize / 2
      const centerY = containerSize / 2

      // Calculate the point on the image that is currently at the center of the container
      const imgCenterX = (centerX - position.x) / zoom
      const imgCenterY = (centerY - position.y) / zoom

      // Calculate the new position to keep the same point centered after zoom
      const newX = centerX - imgCenterX * newZoom
      const newY = centerY - imgCenterY * newZoom

      // Apply constraints to ensure image covers the crop area
      const constrainedPosition = constrainPosition(newX, newY, newZoom)

      setZoomFactor(newZoomFactor)
      setZoom(newZoom)
      setPosition(constrainedPosition)
    },
    [position, zoom, baseZoom, constrainPosition]
  )

  // Mouse/touch event handlers for dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    },
    [position]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length !== 1) {
        return
      }

      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    },
    [position]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !imageRef.current || !containerRef.current) {
        return
      }

      // Calculate new position
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      // Apply constraints
      const constrainedPosition = constrainPosition(newX, newY, zoom)
      setPosition(constrainedPosition)
    },
    [isDragging, dragStart, zoom, constrainPosition]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1 || !containerRef.current) {
        return
      }

      // Calculate new position
      const newX = e.touches[0].clientX - dragStart.x
      const newY = e.touches[0].clientY - dragStart.y

      // Apply constraints
      const constrainedPosition = constrainPosition(newX, newY, zoom)
      setPosition(constrainedPosition)
    },
    [isDragging, dragStart, zoom, constrainPosition]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Create a canvas with the cropped image when the user clicks "Crop & Save"
  const handleCrop = useCallback(async () => {
    if (!imageRef.current || !containerRef.current) {
      return
    }

    try {
      // Create a temporary canvas for the crop
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      const img = imageRef.current
      const container = containerRef.current
      const containerSize = container.clientWidth

      // Set canvas size to a square (using the container's width)
      canvas.width = containerSize
      canvas.height = containerSize

      // Calculate the visible portion of the image
      const visibleX = -position.x / zoom
      const visibleY = -position.y / zoom
      const visibleWidth = containerSize / zoom
      const visibleHeight = containerSize / zoom

      // Draw only the visible portion of the image to the canvas
      ctx.drawImage(
        img,
        visibleX,
        visibleY,
        visibleWidth,
        visibleHeight,
        0,
        0,
        containerSize,
        containerSize
      )

      // Create a temporary image with the cropped data
      const tempImage = new Image()
      tempImage.onload = async () => {
        await onCrop(tempImage)
      }
      tempImage.src = canvas.toDataURL("image/png")
    } catch (error) {
      logger.error(new Error("Error during image crop", { cause: error }))
    }
  }, [position, zoom, onCrop])

  // Reset state when dialog opens or image changes
  useEffect(() => {
    if (isOpen && imageUrl) {
      setPosition({ x: 0, y: 0 })
      setZoom(1)
      setBaseZoom(1)
      setZoomFactor(1)
      setImageLoaded(false)
      setImageDimensions({ width: 0, height: 0 })
    }
  }, [isOpen, imageUrl])

  useEffect(() => {
    const controller = new AbortController()

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove, {
        signal: controller.signal,
      })
      window.addEventListener("mouseup", handleMouseUp, {
        signal: controller.signal,
      })
      window.addEventListener("touchmove", handleTouchMove, {
        signal: controller.signal,
        passive: false,
      })
      window.addEventListener("touchend", handleMouseUp, {
        signal: controller.signal,
      })
    }

    return () => {
      controller.abort()
    }
  }, [isOpen, handleMouseMove, handleMouseUp, handleTouchMove])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust your Avatar</DialogTitle>
          <DialogDescription>
            Drag to position and use the slider to zoom in or out. The visible
            area will be used as your profile picture.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {imageUrl ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                ref={containerRef}
                className={cn(
                  "relative aspect-square w-full max-w-64 overflow-hidden border-2 border-primary",
                  "touch-none", // Prevent browser handling of touch events
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                )}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Translucent circle overlay to show how it will appear in round avatars */}
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-row items-center justify-center">
                  {/* Semi-transparent overlay for area outside the circle */}
                  <div className="absolute inset-0 bg-surface/20"></div>
                  {/* Transparent circle cutout */}
                  <div className="absolute h-full w-full">
                    <div className="relative h-full w-full">
                      <div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/70 bg-transparent"
                        style={{
                          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.2)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "absolute translate-x-[--image-position-x] translate-y-[--image-position-y] transition-opacity",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error CSS variables in style actually works
                    "--image-position-x": `${position.x}px`,
                    "--image-position-y": `${position.y}px`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Preview"
                    className="max-w-none origin-top-left scale-[--image-zoom]"
                    style={{
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error CSS variables in style actually works
                      "--image-zoom": `${zoom}`,
                    }}
                    onLoad={handleImageLoad}
                    draggable={false}
                  />
                </div>
                {!imageLoaded ? (
                  <div className="flex h-full w-full flex-row items-center justify-center">
                    <LoadingBlock>
                      <LoadingBlockSpinner className="size-8" />
                    </LoadingBlock>
                  </div>
                ) : null}
              </div>
              <div className="w-full max-w-xs">
                <Slider
                  min={MIN_ZOOM}
                  max={MAX_ZOOM}
                  step={ZOOM_STEP}
                  value={[zoomFactor]}
                  onValueChange={handleZoomChange}
                  disabled={!imageLoaded}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ErrorBlock>
                <ErrorBlockTitle>No image selected</ErrorBlockTitle>
              </ErrorBlock>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleCrop} disabled={!imageLoaded}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
AvatarCropDialog.displayName = "AvatarCropDialog"
