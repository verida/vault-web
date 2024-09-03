"use client"

import { useRouter } from "next/navigation"

import {
  ConnectProviderDialog,
  ConnectProviderDialogTrigger,
} from "@/app/(connected)/connections/_components/connect-provider-dialog"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Connection, Provider } from "@/features/connections"

export type ActiveConnectionCardProps = {
  onDisconnect?: () => void
  connection: Connection
}

export function ActiveConnectionCard(props: ActiveConnectionCardProps) {
  const { connection, onDisconnect } = props

  const router = useRouter()

  const handleClickConnection = () => {
    router.push(`/connections/${connection.name}`)
  }

  return (
    <div
      className="flex h-full cursor-pointer flex-col"
      onClick={handleClickConnection}
    >
      <Card className="flex-grow">
        <CardHeader className="flex flex-row justify-between pb-0">
          {connection.icon ? (
            // <Image
            //   src={iconUrl}
            //   alt={label}
            //   width={48}
            //   height={48}
            //   className="size-12 rounded-full border"
            // />
            /* eslint-disable @next/next/no-img-element */
            <img
              src={connection.icon}
              alt={connection.label}
              width={48}
              height={48}
              className="size-12 rounded-full border"
            />
          ) : null}
          <Button
            size="lg"
            variant="outline"
            className="!mt-0 px-4 text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onDisconnect?.()
            }}
          >
            Disconnect
          </Button>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Typography variant="heading-4" className="mb-2 mt-6">
            {connection.label}
          </Typography>
          {connection.userId && (
            <Typography className="mb-4">{connection.userId}</Typography>
          )}
          {connection.description && (
            <Typography variant="base-l" className="text-muted-foreground">
              {connection.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export type AvailableProviderCardProps = {
  provider: Provider
}

export function AvailableProviderCard(props: AvailableProviderCardProps) {
  const { provider } = props

  return (
    <div className="flex h-full flex-col">
      <Card className="-mt-4 flex-grow">
        <CardHeader className="flex flex-row justify-between pb-0">
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
          <ConnectProviderDialog providerName={provider.name}>
            <ConnectProviderDialogTrigger asChild>
              <Button size="lg" variant="outline" className="!mt-0 px-4">
                Connect
              </Button>
            </ConnectProviderDialogTrigger>
          </ConnectProviderDialog>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Typography variant="heading-4" className="mb-2 mt-6">
            {provider.label}
          </Typography>
          {provider.description && (
            <Typography variant="base-l" className="text-muted-foreground">
              {provider.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
