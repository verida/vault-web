import Image from "next/image"
import Link from "next/link"

import { veridaLandingSocials } from "@/app/_components/platform"
import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

export type LandingPageHeaderProps = Omit<
  React.ComponentProps<"header">,
  "children"
>

export function LandingPageHeader(props: LandingPageHeaderProps) {
  const { className, ...headerProps } = props
  return (
    <header {...headerProps} className={cn("py-4 md:py-6", className)}>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        <Image src="/logo.svg" alt="Verida Vault Logo" height={32} width={95} />
        <ul className="flex flex-row items-center gap-2">
          {veridaLandingSocials.map((social) => (
            <li key={`link-${social.url}`}>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="size-7 rounded-full"
              >
                <Link
                  href={social.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
