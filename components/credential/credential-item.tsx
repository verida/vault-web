import React, { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"
import { Valid } from "../icons/valid"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getPublicProfile } from "@/features/profiles"

type CredentialItemProps = {
  logo?: string
  title?: string
  source?: string
  date?: number
  status?: 'valid' | 'invalid' | 'expired' // TODO define credential status
  href?: string
  credential?: any
  fallbackAvatar?: string
}

function CredentialItem({ logo, title, fallbackAvatar, credential, source, date, status, href }: CredentialItemProps) {
  const [issuer, setIssuer] = React.useState({})


  React.useEffect(() => {
    function parseJwt(token: string) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      console.log('parseJwt',  JSON.parse(jsonPayload))
      return JSON.parse(jsonPayload);
    }

    async function fetchIssuerProfile(did: string) {
      // TODO: make the call to API work so we have a server cache for public profiles
      // const res = await fetch('/api/profile/' + dat.iss) 
      // console.log('profile', await res.json())
      console.log('load profile', did)
      const profile = await getPublicProfile(did)
      console.log('Profile:', profile)
      setIssuer(profile)
    }

    credential && fetchIssuerProfile(parseJwt(credential)?.iss)
  }, [credential])


  return (
    <Link href={href || '#'}>
      <Card className="flex rounded-lg w-full">
        <div className="flex p-4 flex-row items-center w-full">
          <div className="flex gap-2 items-center w-1/4">
            <Avatar>
              {issuer?.avatar?.uri && <AvatarImage src={issuer?.avatar?.uri} asChild><Image src={issuer?.avatar?.uri} width={40} height={40} alt="Issuer avatar" /></AvatarImage>}
              <AvatarFallback>{fallbackAvatar}</AvatarFallback>
            </Avatar>
            {title && <p className="text-sm text-wrap">{title}</p>}
          </div>
          {source && <p className="text-sm text-gray-500 w-1/4 text-wrap">{issuer?.name ?? ''}</p>}
          {date && <p className="text-sm text-gray-500 w-1/4">{new Date(date).toISOString()}</p>}
          {status === 'valid' ? <div className="flex gap-2 w-1/4"><Valid /><p className="text-sm text-gray-500">{status}</p> </div> : null}
        </div>
      </Card>
    </Link>
  )
}

export { CredentialItem }