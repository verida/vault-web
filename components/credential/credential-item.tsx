import Image from "next/image";
import Link from "next/link";
import React from "react";

import { getPublicProfile } from "@/features/profiles";

import { Valid } from "../icons/valid";
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
      <Card className="flex w-full rounded-lg">
        <div className="flex w-full flex-row items-center p-4">
          <div className="flex w-1/4 items-center gap-2">
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
            {title && <p className="text-wrap text-sm">{title}</p>}
          </div>
          {source && (
            <p className="w-1/4 text-wrap text-sm text-secondary-foreground">
              {issuer?.name ?? ""}
            </p>
          )}
          {date && (
            <p className="w-1/4 text-sm text-secondary-foreground">
              {new Date(date).toISOString()}
            </p>
          )}
          {status === "valid" ? (
            <div className="flex w-1/4 gap-2">
              <Valid />
              <p className="text-sm text-secondary-foreground">{status}</p>{" "}
            </div>
          ) : null}
        </div>
      </Card>
    </Link>
  );
}

export { CredentialItem };
