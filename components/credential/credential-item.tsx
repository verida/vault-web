import { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"
import { Valid } from "../icons/valid"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type CredentialItemProps = {
  logo?: string
  title?: string
  source?: string
  date?: number
  status?: 'valid' | 'invalid' | 'expired' // TODO define credential status
  href?: string
  fallbackAvatar?: string
}

function CredentialItem({ logo, title, fallbackAvatar, source, date, status, href }: CredentialItemProps) {
  return (
    <Link href={href || '#'}>
      <Card className="flex rounded-lg w-full">
        <div className="flex p-4 flex-row items-center w-full">
          <div className="flex gap-2 items-center w-1/4">
              <Avatar>
                {logo && <AvatarImage src={logo} asChild><Image src={logo} width={40} height={40} alt="company logo" /></AvatarImage> }
                <AvatarFallback>{fallbackAvatar}</AvatarFallback>
              </Avatar>
            {title && <p className="text-sm text-wrap">{title}</p>}
          </div>
          {source && <p className="text-sm text-gray-500 w-1/4 text-wrap">{source}</p>}
          {date && <p className="text-sm text-gray-500 w-1/4">{new Date(date).toISOString()}</p>}
          {status === 'valid' ? <div className="flex gap-2 w-1/4"><Valid /><p className="text-sm text-gray-500">{status}</p> </div> : null}
        </div>
      </Card>
    </Link>
  )
}

export { CredentialItem }