import Image from "next/image";
import Link from "next/link";
import React from "react";

import { DataSchema } from "@/features/data";
import { getPublicProfile } from "@/features/profiles";

import { Valid } from "../icons/valid";
import { Typography } from "../typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

type CredentialItemProps = {
  logo?: string;
  title?: string;
  source?: string;
  date?: number;
  status?: "valid" | "invalid" | "expired"; // TODO define credential status
  href?: string;
  credential?: any;
  fallbackAvatar?: string;
};

function CredentialItem({
  // logo,
  title,
  fallbackAvatar,
  credential,
  source,
  date,
  status,
  href,
}: CredentialItemProps) {
  const [issuer, setIssuer] = React.useState<any>({});

  React.useEffect(() => {
    function parseJwt(token: string) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      console.log("parseJwt", JSON.parse(jsonPayload));
      return JSON.parse(jsonPayload);
    }

    async function fetchIssuerProfile(did: string) {
      // TODO: make the call to API work so we have a server cache for public profiles
      // const res = await fetch('/api/profile/' + dat.iss)
      // console.log('profile', await res.json())
      console.log("load profile", did);
      const profile = await getPublicProfile(did);
      console.log("Profile:", profile);
      setIssuer(profile);
    }

    credential && fetchIssuerProfile(parseJwt(credential)?.iss);
  }, [credential]);

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
                className="text-secondary-foreground"
              >
                {title}
              </Typography>
            )}
          </div>
          {source && (
            <Typography
              variant="base-semibold"
              className="w-1/4 text-wrap text-secondary-foreground"
            >
              {issuer?.name ?? ""}
            </Typography>
          )}
          {date && (
            <Typography
              variant="base-semibold"
              className="w-1/4 text-secondary-foreground"
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
                className="text-secondary-foreground"
              >
                {source}
              </Typography>
            )}
            {date && (
              <Typography
                variant="base-s-semibold"
                className="text-secondary-foreground"
              >
                {new Date(date).toISOString()}
              </Typography>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export { CredentialItem };
