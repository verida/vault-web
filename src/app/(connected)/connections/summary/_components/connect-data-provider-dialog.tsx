"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { VLogo } from "@/components/icons/logo"
import { Switch } from "@/components/icons/switch"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Skeleton } from "@/components/ui/skeleton"
import {
  DataConnectionsChannelEvent,
  DataProvider,
  buildConnectProviderUrl,
  useDataConnectionsContext,
  useDataProviders,
} from "@/features/data-connections"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry"
import { cn } from "@/styles/utils"

const logger = Logger.create("ConnectDataProviderDialog")

export type ConnectDataProviderDialogProps = {
  children: React.ReactNode
  providerName?: string
}

export function ConnectDataProviderDialog(
  props: ConnectDataProviderDialogProps
) {
  const { children, providerName } = props

  const router = useRouter()

  const { providers, isLoading: isLoadingProviders } = useDataProviders()
  const [provider, setProvider] = useState<DataProvider | null>(null)

  useEffect(() => {
    const foundProvider = providers?.find((c) => c.name === providerName)
    setProvider(foundProvider || null)
  }, [providerName, providers])

  const handleOpenChange = useCallback(() => {
    if (!providerName) {
      // If the component is mounted without a provider name, we reset the selected provider
      setProvider(null)
    }
  }, [providerName])

  const { broadcastChannel: dataConnectionsChannel } =
    useDataConnectionsContext()
  const [status, setStatus] = useState<"idle" | "connecting" | "connected">(
    "idle"
  )

  const handleConnectClick = useCallback(() => {
    if (!provider) {
      return
    }

    setStatus("connecting")
    try {
      const url = buildConnectProviderUrl(provider.name)
      window.open(url, "_blank")
    } catch (error) {
      setStatus("idle")
      logger.error(
        new Error("Error building connect provider URL", {
          cause: error,
        })
      )
    }
  }, [provider])

  const handleNewDataConnection = useCallback(
    (event: MessageEvent<DataConnectionsChannelEvent>) => {
      const { type, payload } = event.data
      if (type !== "new-data-connection") {
        return
      }

      logger.debug("New data connection event received")

      const { connectionId } = payload

      if (connectionId) {
        router.push(getConnectionPageRoute({ connectionId }))
      } else {
        // For the moment the connectionId is not available, so we handle that other case to set conencted status and adapt the UI
        setStatus("connected")
      }
    },
    [router]
  )

  useEffect(() => {
    dataConnectionsChannel.addEventListener("message", handleNewDataConnection)
    return () => {
      dataConnectionsChannel.removeEventListener(
        "message",
        handleNewDataConnection
      )
    }
  }, [dataConnectionsChannel, handleNewDataConnection])

  return (
    <Dialog onOpenChange={handleOpenChange}>
      {/* Expect the trigger to be passed as a child */}
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {provider ? `Connect with ${provider.label}` : "Add Connection"}
          </DialogTitle>
          {/* TODO: Add description for accessibility */}
        </DialogHeader>
        {provider ? (
          <DialogBody className="flex flex-col gap-8">
            <div className="flex flex-row items-center justify-center gap-6">
              <Avatar className="size-20">
                <AvatarImage src={provider.icon} alt={provider.label} />
                <AvatarFallback>
                  {provider.label?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
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
              {providers && providers.length === 0 ? (
                <Typography variant="base-regular">
                  There are no available connections at the moment.
                </Typography>
              ) : providers && providers.length !== 0 ? (
                <>
                  {providers.map((provider) => (
                    <ProviderSelectionItem
                      key={provider.name}
                      provider={provider}
                      onClick={() => setProvider(provider)}
                    />
                  ))}
                </>
              ) : isLoadingProviders ? (
                <>
                  {[1, 2, 3].map((index) => (
                    <ProviderSelectionItemSkeleton key={index} />
                  ))}
                </>
              ) : (
                <Alert variant="error">
                  <AlertDescription>
                    There has been an error getting the available connections.
                    Please try again later.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </DialogBody>
        )}
        {provider ? (
          <DialogFooter>
            {status !== "connected" ? (
              <Button
                variant="primary"
                onClick={handleConnectClick}
                disabled={status === "connecting"}
              >
                {status === "connecting" ? "Connecting..." : "Connect"}
              </Button>
            ) : (
              <Alert variant="info">
                <AlertDescription>Connection successful.</AlertDescription>
              </Alert>
            )}
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
        <Avatar className="size-12">
          <AvatarImage src={provider.icon} alt={provider.label} />
          <AvatarFallback>{provider.label?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start text-start">
          <Typography variant="heading-4">{provider.label}</Typography>
          <span
            className="text-muted-foreground" // FIXME: Fix class conflicts in the Typography with text-muted-foreground removing the class text-base-s-regular
          >
            <Typography variant="base-s-regular" className="line-clamp-2">
              {provider.description}
            </Typography>
          </span>
        </div>
        <ChevronRight className="text-muted-foreground" />
      </Card>
    </button>
  )
}
ProviderSelectionItem.displayName = "ProviderSelectionItem"

type ProviderSelectionItemSkeletonProps = React.ComponentProps<"div">

function ProviderSelectionItemSkeleton(
  props: ProviderSelectionItemSkeletonProps
) {
  const { className, ...divProps } = props

  return (
    <div className={cn("rounded-lg", className)} {...divProps}>
      <Card className="flex w-full flex-row items-center gap-3 p-4 pr-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-1 flex-col items-start text-start">
          <Skeleton className="my-1 h-4 w-1/3 sm:h-5" />
          <div className="flex flex-col gap-0">
            <Skeleton className="my-1.5 h-4 w-full" />
            <Skeleton className="my-1.5 h-4 w-3/4" />
          </div>
        </div>
      </Card>
    </div>
  )
}
ProviderSelectionItemSkeleton.displayName = "ProviderSelectionItemSkeleton"
