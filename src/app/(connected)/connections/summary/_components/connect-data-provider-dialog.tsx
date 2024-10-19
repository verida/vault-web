"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { ConnectDataProviderDialogProviderSelection } from "@/app/(connected)/connections/summary/_components/connect-data-provider-dialog-provider-selection"
import { VLogo } from "@/components/icons/logo"
import { Switch } from "@/components/icons/switch"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  SuccessBlock,
  SuccessBlockDescription,
  SuccessBlockImage,
  SuccessBlockTitle,
} from "@/components/ui/success"
import { useDataConnectionsBroadcast } from "@/features/data-connections/hooks/use-data-connections-broadcast"
import { useDataProviders } from "@/features/data-connections/hooks/use-data-providers"
import {
  DataConnectionsChannelEvent,
  DataProvider,
} from "@/features/data-connections/types"
import { buildConnectProviderUrl } from "@/features/data-connections/utils"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida/use-verida"

const logger = Logger.create("connect-data-provider-dialog")

export type ConnectDataProviderDialogProps = {
  children: React.ReactNode
  providerId?: string
}

export function ConnectDataProviderDialog(
  props: ConnectDataProviderDialogProps
) {
  const { children, providerId } = props

  const { getAccountSessionToken } = useVerida()
  const router = useRouter()

  const { providers } = useDataProviders()
  const [provider, setProvider] = useState<DataProvider | null>(null)

  useEffect(() => {
    const foundProvider = providers?.find((p) => p.id === providerId)
    setProvider(foundProvider || null)
  }, [providerId, providers])

  const handleOpenChange = useCallback(() => {
    if (!providerId) {
      // If the component is mounted without a provider name, we reset the selected provider
      setProvider(null)
    }
  }, [providerId])

  const { broadcastChannel: dataConnectionsChannel } =
    useDataConnectionsBroadcast()
  const [status, setStatus] = useState<
    "idle" | "connecting" | "connected" | "error"
  >("idle")

  const handleConnectClick = useCallback(async () => {
    if (!provider) {
      return
    }

    setStatus("connecting")
    try {
      const sessionToken = await getAccountSessionToken()
      const url = buildConnectProviderUrl(provider.id, sessionToken)
      window.open(url, "_blank")
    } catch (error) {
      setStatus("error")
      logger.error(
        new Error("Error building connect provider URL", {
          cause: error,
        })
      )
    }
  }, [provider, getAccountSessionToken])

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
          <DialogDescription
            // Description added for accessibility purposes
            className="hidden"
          >
            Connect your account to extract your data and store it into your
            Vault.
          </DialogDescription>
        </DialogHeader>
        {provider ? (
          <DialogBody className="flex flex-col gap-8">
            {status === "error" ? (
              <ErrorBlock>
                <ErrorBlockImage />
                <ErrorBlockTitle>Connection Error</ErrorBlockTitle>
                <ErrorBlockDescription>
                  There was an error connecting to the platform. Please try
                  again later.
                </ErrorBlockDescription>
              </ErrorBlock>
            ) : status === "connected" ? (
              <SuccessBlock>
                <SuccessBlockImage />
                <SuccessBlockTitle>Connection Successful</SuccessBlockTitle>
                <SuccessBlockDescription>
                  Your {provider.label} account has been connected successfully.
                </SuccessBlockDescription>
              </SuccessBlock>
            ) : (
              <>
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
              </>
            )}
          </DialogBody>
        ) : (
          <ConnectDataProviderDialogProviderSelection
            onSelectItem={setProvider}
          />
        )}
        {provider && (status === "idle" || status === "connecting") ? (
          <DialogFooter>
            <Button
              variant="primary"
              onClick={handleConnectClick}
              disabled={status === "connecting"}
            >
              {status === "connecting" ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
ConnectDataProviderDialog.displayName = "ConnectDataProviderDialog"

export const ConnectDataProviderDialogTrigger = DialogTrigger
