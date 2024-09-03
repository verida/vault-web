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
import { MOCK_DATA_PROVIDERS } from "@/features/connections"

export type ConnectDataProviderDialogProps = {
  children: React.ReactNode
  providerName: string
}

export function ConnectDataProviderDialog(
  props: ConnectDataProviderDialogProps
) {
  const { children, providerName } = props

  const provider = useMemo(() => {
    return MOCK_DATA_PROVIDERS.find((c) => c.name === providerName)
  }, [providerName])

  if (!provider) {
    return null
  }

  return (
    <Dialog>
      {/* Expect the trigger to be passed as a child */}
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect with {provider.label}</DialogTitle>
          {/* TODO: Add description for accessibility */}
        </DialogHeader>
        <DialogBody className="flex flex-col gap-8">
          <div className="flex flex-row items-center justify-center gap-6">
            {provider.icon ? (
              // <Image
              //   src={connection.icon}
              //   alt={connection.label}
              //   width={80}
              //   height={80}
              //   className="size-20 rounded-full border"
              // />
              /* eslint-disable @next/next/no-img-element */
              <img
                src={provider.icon}
                alt={provider.label}
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
              {provider.description}
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
ConnectDataProviderDialog.displayName = "ConnectDataProviderDialog"

export const ConnectDataProviderDialogTrigger = DialogTrigger
