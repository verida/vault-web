import type { Metadata } from "next"
import Link from "next/link"

import { RootConnectionHandler } from "@/components/root-connection-handler"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { VeridaConnectionOptions } from "@/components/verida/verida-connection-options"
import {
  APP_TITLE_FOR_LANDING,
  TERMS_AND_CONDITIONS_URL,
  VERIDA_WEBSITE_URL,
} from "@/constants/app"
import { VERIDA_PLATFORMS } from "@/features/landing/verida-platforms"

export const metadata: Metadata = {
  title: {
    absolute: APP_TITLE_FOR_LANDING,
  },
}

export default function RootPage() {
  const currentDate = new Date()

  return (
    <RootConnectionHandler>
      <div className="flex h-full min-h-fit flex-col gap-8 px-4 py-6">
        <div className="flex flex-1 flex-col items-center gap-10">
          <div className="flex max-w-3xl flex-col gap-2 text-center">
            <Typography variant="heading-1">
              Take control of your personal data
            </Typography>
            <Typography variant="base-l">
              Securely manage your personal data with the Verida Vault.
            </Typography>
          </div>
          <VeridaConnectionOptions />
          <Accordion type="multiple" className="w-full max-w-3xl">
            <AccordionItem value="what-is-verida">
              <AccordionTrigger>What is Verida?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <Typography>
                  Verida allows you to take back the control of your personal
                  data by extracting them from your usual services and storing
                  them in a secured way.
                </Typography>
                <Typography>
                  The Verida Network guarantees the security of your data by
                  using decentralised storage nodes and cryptographic techniques
                  where you are the owner of your data.
                </Typography>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="what-is-verida-vault">
              <AccordionTrigger>What is Verida Vault?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <Typography>
                  The Verida Vault is the web application to manage your data.
                  You can connect your web2 platforms to extract your data as
                  well as see all your data.
                </Typography>
                <Typography>
                  The Verida Vault also allows you to manage the access to your
                  stored data. You can authorize third-party applications such
                  as AI agents to access your data, and revoke their access at
                  any time.
                </Typography>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-row items-center gap-2 self-center">
          {VERIDA_PLATFORMS.map((platform) => (
            <Button
              key={platform.url}
              variant="outline"
              size="icon"
              className="size-7 rounded-full"
              asChild
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
          ))}
        </div>
        <footer className="flex flex-row items-center justify-between gap-4 text-muted-foreground">
          <Link
            href={VERIDA_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:underline md:no-underline"
          >
            <Typography variant="base-s-regular">
              &copy; {currentDate.getFullYear()} Verida Network
            </Typography>
          </Link>
          <Link
            href={TERMS_AND_CONDITIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:underline md:no-underline"
          >
            <Typography variant="base-s-regular">Terms & Conditions</Typography>
          </Link>
        </footer>
      </div>
    </RootConnectionHandler>
  )
}
RootPage.displayName = "RootPage"
