import Link from "next/link"
import React from "react"

import { Connection, supportedData } from "@/features/connections"
import { useVerida } from "@/features/verida"

import { ArrowLeft } from "../icons/arrow-left"
import { Typography } from "../typography"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import ConnectionLogs from "./connection-logs"
import SupportedDataCard from "./supported-data-card"

type Props = {
  connection: Connection
}

const ConnectionDetails = ({ connection }: Props) => {
  const { profile } = useVerida()

  return (
    <div>
      <Link href={"/connections"} className="flex items-center gap-5">
        <ArrowLeft />
        <Typography variant={"heading-5"}>Back to all Connections</Typography>
      </Link>

      <div className="mt-9 space-y-10">
        <div>
          <div className="flex items-center gap-2">
            <connection.icon className="size-10" />
            <Typography variant={"heading-4"}>{connection.id}</Typography>
          </div>

          <div className="mt-6">
            <div className="rounded-2xl bg-[#6B728014]">
              <Card className="flex flex-col justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="relative size-12">
                    <Avatar className="size-12">
                      <AvatarImage
                        alt="Avatar"
                        src={profile?.avatar?.uri ?? ""}
                        width={48}
                        height={48}
                      />
                      <AvatarFallback>
                        {profile?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <connection.icon className="absolute bottom-0 right-0 size-5 rounded-full border border-white" />
                  </div>
                  <div>
                    <Typography variant={"heading-5"}>
                      {profile?.name}
                    </Typography>
                    <Typography variant={"base-s-semibold"}>
                      {connection.userId}
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <Button variant={"secondary"} className="text-destructive">
                    Disconnect
                  </Button>
                  <Button variant={"secondary"}>Disable</Button>
                  <Button variant={"secondary"}>Sync All Data</Button>
                </div>
              </Card>

              <div className="flex flex-col justify-between gap-6 px-6 py-5 md:flex-row md:items-center">
                <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                  <Typography variant={"base-regular"}>
                    Synced data items
                  </Typography>
                  <Typography variant={"heading-5"}>563</Typography>
                </div>
                <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                  <Typography variant={"base-regular"}>Last synced</Typography>
                  <Typography variant={"heading-5"}>
                    4 Feb 2023, 10:00am
                  </Typography>
                </div>
                <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                  <Typography variant={"base-regular"}>Status</Typography>
                  <Typography
                    className="rounded-md bg-approved px-3 py-1 text-primary"
                    variant={"base-semibold"}
                  >
                    Connected
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Typography variant={"heading-3"}>Supported Data Types</Typography>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {supportedData.map((data, index) => (
              <SupportedDataCard data={data} key={index} />
            ))}
          </div>
        </div>

        <ConnectionLogs />
      </div>
    </div>
  )
}

export default ConnectionDetails
