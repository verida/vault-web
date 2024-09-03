"use client"

import { ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { VLogo } from "@/components/icons/logo"
import { Switch } from "@/components/icons/switch"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DataProvider, MOCK_DATA_PROVIDERS } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type ConnectDataProviderDialogProps = {
  children: React.ReactNode
  providerName?: string
}

export function ConnectDataProviderDialog(
  props: ConnectDataProviderDialogProps
) {
  const { children, providerName } = props

  const [provider, setProvider] = useState<DataProvider | null>(null)

  useEffect(() => {
    const foundProvider = MOCK_DATA_PROVIDERS.find(
      (c) => c.name === providerName
    )
    setProvider(foundProvider || null)
  }, [providerName])

  const handleOpenChange = useCallback(() => {
    if (!providerName) {
      // If the component is mounted without a provider name, we reset the selected provider
      setProvider(null)
    }
  }, [providerName])

  return (
    <Dialog onOpenChange={handleOpenChange}>
      {/* Expect the trigger to be passed as a child */}
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {provider ? `Connect with ${provider.label}` : "Add new connection"}
          </DialogTitle>
          {/* TODO: Add description for accessibility */}
        </DialogHeader>
        {provider ? (
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
        ) : (
          <DialogBody>
            <div className="flex flex-col gap-3 px-1">
              {MOCK_DATA_PROVIDERS.map((provider) => (
                <ProviderSelectionItem
                  key={provider.name}
                  provider={provider}
                  onClick={() => setProvider(provider)}
                />
              ))}
            </div>
          </DialogBody>
        )}
        {provider ? (
          <DialogFooter>
            <Button variant="primary">Connect</Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
ConnectDataProviderDialog.displayName = "ConnectDataProviderDialog"

export const ConnectDataProviderDialogTrigger = DialogTrigger

type ProviderSelectionItemProps = {
  provider: DataProvider
} & React.ComponentProps<"button">

function ProviderSelectionItem(props: ProviderSelectionItemProps) {
  const { provider, className, ...buttonProps } = props

  return (
    <button className={cn("rounded-lg", className)} {...buttonProps}>
      <Card className="flex w-full flex-row items-center gap-3 p-4 pr-3">
        {provider.icon ? (
          // <Image
          //   src={iconUrl}
          //   alt={label}
          //   width={48}
          //   height={48}
          //   className="size-12 rounded-full border"
          // />
          /* eslint-disable @next/next/no-img-element */
          <img
            src={provider.icon}
            alt={provider.label}
            width={48}
            height={48}
            className="size-12 rounded-full border"
          />
        ) : null}
        <div className="flex flex-1 flex-col items-start text-start">
          <Typography variant="heading-4">{provider.label}</Typography>
          <span
            className="text-muted-foreground" // FIXME: Fix class conflicts in the Typography with text-muted-foreground removing the class text-base-s-regular
          >
            <Typography variant="base-s-regular" className="line-clamp-2">
              {provider.description ||
                `Connect your ${provider.label} account to extract your data and store it into your Vault.`}
            </Typography>
          </span>
        </div>
        <ChevronRight className="text-muted-foreground" />
      </Card>
    </button>
  )
}
ProviderSelectionItem.displayName = "ProviderSelectionItem"
