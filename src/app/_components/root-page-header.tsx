import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { VERIDA_PLATFORMS } from "@/features/landing/verida-platforms"

export interface RootPageHeaderProps
  extends Omit<React.ComponentProps<"header">, "children"> {}

export function RootPageHeader(props: RootPageHeaderProps) {
  const { className, ...headerProps } = props

  return (
    <header {...headerProps} className={className}>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        <Image src="/logo.svg" alt="Verida Vault Logo" height={32} width={95} />
        <ul className="flex flex-row items-center gap-2">
          {VERIDA_PLATFORMS.map((platform) => (
            <li key={platform.url}>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="size-7 rounded-full"
              >
                <Link
                  href={platform.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <platform.icon className="size-1/2" />
                  <span className="sr-only">{platform.label}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
RootPageHeader.displayName = "RootPageHeader"
