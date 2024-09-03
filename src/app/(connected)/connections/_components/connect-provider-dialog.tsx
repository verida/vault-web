"use client"

import { useMemo } from "react"

import { VLogo } from "@/components/icons/logo"
import { Switch } from "@/components/icons/switch"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MOCK_PROVIDERS } from "@/features/connections"

export type ConnectProviderDialogProps = {
  isOpen: boolean
  onClose: () => void
  providerName: string
}

export function ConnectProviderDialog(props: ConnectProviderDialogProps) {
  const { providerName, isOpen, onClose } = props

  const connection = useMemo(() => {
    return MOCK_PROVIDERS.find((c) => c.name === providerName)
  }, [providerName])

  if (!connection) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect with {connection.label}</DialogTitle>
          {/* TODO: Add description for accessibility */}
        </DialogHeader>
        <DialogBody className="flex flex-col gap-8">
          <div className="flex flex-row items-center justify-center gap-6">
            {connection.icon ? (
              // <Image
              //   src={connection.icon}
              //   alt={connection.label}
              //   width={80}
              //   height={80}
              //   className="size-20 rounded-full border"
              // />
              /* eslint-disable @next/next/no-img-element */
              <img
                src={connection.icon}
                alt={connection.label}
                width={80}
                height={80}
                className="size-20 rounded-full border"
              />
            ) : null}
            <Switch />
            <VLogo className="rounded-full border" />
          </div>
          <div className="flex flex-col gap-4">
            <Typography variant="heading-4">What it will do</Typography>
            <Typography variant="base-regular">
              {/* TODO: Rework the description */}
              {connection.description}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="primary">Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const ConnectProviderDialogTrigger = DialogTrigger
