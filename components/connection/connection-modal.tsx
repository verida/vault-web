import { useMemo } from "react"

import { connections } from "@/features/connections"

import { VLogo } from "../icons/logo"
import { Switch } from "../icons/switch"
import { Typography } from "../typography"
import { Button } from "../ui/button"
import { Modal } from "../ui/modal"

type Props = {
  isOpen: boolean
  onClose: () => void
  connectionId: string
} & React.PropsWithChildren

function ConnectionModal({ connectionId, ...props }: Props) {
  const connection = useMemo(() => {
    return connections.find((c) => c.id === connectionId)
  }, [connectionId])

  return (
    <Modal {...props}>
      {connection && (
        <div className="mx-auto flex items-center space-x-6">
          {connection.icon && <connection.icon className="h-20 w-20" />}
          <Switch />
          <VLogo className="rounded-full border border-border" />
        </div>
      )}

      <Typography variant="heading-4" className="mt-8">
        What it will do
      </Typography>
      {connection && (
        <Typography variant="base-regular" className="mt-4">
          {" "}
          When you connect {connection.id} and Verida, your {connection.id}{" "}
          activities will automatically show up on Verida for all your friends
          to see. Additionally, {connection.item} and content shared via{" "}
          {connection.id} will automatically contribute to your Verida all-day
          stats like mentions and engagement.
        </Typography>
      )}

      <Button variant="secondary" className="mt-8 w-full">
        Connect
      </Button>
    </Modal>
  )
}

export { ConnectionModal }
