"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

import { Valid } from "@/components/icons/valid"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
// import { DataSchema } from "@/features/data"
import { getPublicProfile } from "@/features/profiles"

export type CredentialItemProps = {
  logo?: string
  title?: string
  source?: string
  date?: number
  status?: "valid" | "invalid" | "expired" // TODO define credential status
  href?: string
  credential?: any
  fallbackAvatar?: string
}

export function CredentialItem(props: CredentialItemProps) {
  const {
    // logo,
    title,
    fallbackAvatar,
    credential,
    source,
    date,
    status,
    href,
  } = props

  const [issuer, setIssuer] = useState<any>({})

  React.useEffect(() => {
    function parseJwt(token: string) {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join("")
      )
      // console.log("parseJwt", JSON.parse(jsonPayload))
      return JSON.parse(jsonPayload)
    }

    async function fetchIssuerProfile(did: string) {
      const profile = await getPublicProfile(did)
      setIssuer(profile)
    }

    credential && fetchIssuerProfile(parseJwt(credential)?.iss)
  }, [credential])

  return (
    <Link href={href || "#"}>
      <Card className="flex w-full rounded-lg shadow-card">
        {/* desktop */}
        <div className="hidden w-full flex-row items-center px-4 py-3 md:flex">
          <div className="flex w-1/4 items-center gap-3">
            <Avatar>
              {issuer?.avatar?.uri && (
                <AvatarImage src={issuer?.avatar?.uri} asChild>
                  <Image
                    src={issuer?.avatar?.uri}
                    width={40}
                    height={40}
                    alt="Issuer avatar"
                  />
                </AvatarImage>
              )}
              <AvatarFallback>{fallbackAvatar}</AvatarFallback>
            </Avatar>
            {title && (
              <Typography
                variant="base-semibold"
                className="text-muted-foreground"
              >
                {title}
              </Typography>
            )}
          </div>
          {source && (
            <Typography
              variant="base-semibold"
              className="w-1/4 text-wrap text-muted-foreground"
            >
              {issuer?.name ?? ""}
            </Typography>
          )}
          {date && (
            <Typography
              variant="base-semibold"
              className="w-1/4 text-muted-foreground"
            >
              {new Date(date).toISOString()}
            </Typography>
          )}
          {status === "valid" ? (
            <div className="flex w-1/4 gap-2">
              <Valid />
              <Typography variant="base-semibold">{status}</Typography>
            </div>
          ) : null}
        </div>

        {/* mobile */}
        <div className="flex w-full gap-3 px-4 py-3 md:hidden">
          <Avatar className="h-16 w-16">
            {issuer?.avatar?.uri && (
              <AvatarImage src={issuer?.avatar?.uri} asChild>
                <Image
                  src={issuer?.avatar?.uri}
                  width={64}
                  height={64}
                  alt="Issuer avatar"
                />
              </AvatarImage>
            )}
            <AvatarFallback>{fallbackAvatar}</AvatarFallback>
          </Avatar>

          <div className="flex flex-grow flex-col gap-1">
            <div className="flex justify-between">
              {title && <Typography variant="heading-5">{title}</Typography>}
              {status === "valid" ? (
                <div className="flex gap-2">
                  <Valid />
                  <Typography variant="base-semibold">{status}</Typography>
                </div>
              ) : null}
            </div>
            {source && (
              <Typography
                variant="base-s-semibold"
                className="text-muted-foreground"
              >
                {source}
              </Typography>
            )}
            {date && (
              <Typography
                variant="base-s-semibold"
                className="text-muted-foreground"
              >
                {new Date(date).toISOString()}
              </Typography>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
