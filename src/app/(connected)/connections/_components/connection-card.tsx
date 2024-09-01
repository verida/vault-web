"use client"

import { useRouter } from "next/navigation"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Connection } from "@/features/connections"
import { cn } from "@/styles/utils"

export type ConnectionCardProps = {
  onConnect?: () => void
  onDisconnect?: () => void
  isConnected?: boolean
} & Connection

export function ConnectionCard(props: ConnectionCardProps) {
  const {
    id,
    description,
    onConnect,
    onDisconnect,
    isConnected = false,
    userId,
  } = props

  const router = useRouter()

  const handleClickConnection = () => {
    if (isConnected) {
      router.push(`/connections?id=${id}`)
    }
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col",
        isConnected ? "cursor-pointer" : ""
      )}
      onClick={handleClickConnection}
    >
      {/* {!isConnected && (
        <div className="bg-status-success/70 rounded-t-2xl pb-6 pt-2 text-center text-xs">
          <span className="font-semibold">Earn 100 VDA</span> by connecting to
          the platform
        </div>
      )} */}
      <Card className={cn("flex-grow", !isConnected ? "-mt-4" : "")}>
        <CardHeader className="flex flex-row justify-between pb-0">
          {props.icon && (
            <>
              <props.icon />
            </>
          )}
          {!isConnected ? (
            <Button
              size="lg"
              variant="outline"
              className="!mt-0 px-4"
              onClick={onConnect}
            >
              Connect
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              className="!mt-0 px-4 text-destructive"
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          )}
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
        {isConnected && (
          <CardFooter>
            <div className="flex w-full items-end justify-between border-t pt-4">
              <Typography variant="base-regular">
                Display on Verida One profile
              </Typography>
              <Switch defaultChecked />
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
