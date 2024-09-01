"use client"

import { useRouter } from "next/navigation"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Connection } from "@/features/connections"

export type ConnectionCardProps = {
  onConnect?: () => void
  onDisconnect?: () => void
  isConnected?: boolean
} & Connection

export function ConnectionCard(props: ConnectionCardProps) {
  const { isConnected = false, ...rest } = props

  return isConnected ? (
    <ActiveConnectionCard {...rest} onDisconnect={props.onDisconnect} />
  ) : (
    <InactiveConnectionCard {...rest} onConnect={props.onConnect} />
  )
}

function ActiveConnectionCard(
  props: Omit<ConnectionCardProps, "isConnected" | "onConnect">
) {
  const { id, description, icon: Icon, userId, onDisconnect } = props

  const router = useRouter()

  const handleClickConnection = () => {
    router.push(`/connections?id=${id}`)
  }

  return (
    <div
      className="flex h-full cursor-pointer flex-col"
      onClick={handleClickConnection}
    >
      <Card className="flex-grow">
        <CardHeader className="flex flex-row justify-between pb-0">
          {Icon && <Icon />}
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
          {id && (
            <Typography variant="heading-4" className="mb-2 mt-6">
              {id}
            </Typography>
          )}
          {userId && <Typography className="mb-4">{userId}</Typography>}
          {description && (
            <Typography variant="base-l" className="text-muted-foreground">
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function InactiveConnectionCard(
  props: Omit<ConnectionCardProps, "isConnected" | "onDisconnect" | "userId">
) {
  const { id, description, icon: Icon, onConnect } = props

  return (
    <div className="flex h-full flex-col">
      <Card className="-mt-4 flex-grow">
        <CardHeader className="flex flex-row justify-between pb-0">
          {Icon && <Icon />}
          <Button
            size="lg"
            variant="outline"
            className="!mt-0 px-4"
            onClick={onConnect}
          >
            Connect
          </Button>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {id && (
            <Typography variant="heading-4" className="mb-2 mt-6">
              {id}
            </Typography>
          )}
          {description && (
            <Typography variant="base-l" className="text-muted-foreground">
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
