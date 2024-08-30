"use client"

import { useRouter } from "next/navigation"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Connection } from "@/features/connections"
import { cn } from "@/styles/utils"

type Props = {
  onConnect?: () => void
  onDisconnect?: () => void
  isConnected?: boolean
} & Connection

function ConnectionCard(props: Props) {
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
      className={`flex h-full flex-col ${isConnected ? "cursor-pointer" : ""}`}
      onClick={handleClickConnection}
    >
      {!isConnected && (
        <div className="rounded-[16px_16px_0_0] bg-green-100 pb-6 pt-2 text-center text-xs">
          <span className="font-semibold">Earn 100 VDA</span> by connecting to
          the platform
        </div>
      )}
      <Card className={cn(!isConnected ? "-mt-4" : "", "flex-grow")}>
        <CardHeader className="flex flex-row justify-between pb-0">
          {props.icon && (
            <>
              <props.icon />
            </>
          )}
          {!isConnected ? (
            <Button
              size="lg"
              variant="secondary"
              className="!mt-0 px-4"
              onClick={onConnect}
            >
              Connect
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
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
            <Typography variant="base-l" className="text-secondary-foreground">
              {description}
            </Typography>
          )}
        </CardContent>
        {isConnected && (
          <CardFooter>
            <div className="flex w-full items-end justify-between border-t border-border pt-4">
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

export { ConnectionCard }
