import { Metadata } from "next"

import { LandingPageContent } from "@/app/_components/landing-page-content"
import { RootConnectionHandler } from "@/app/_components/root-connection-handler"
import { APP_TITLE_FOR_LANDING } from "@/constants/app"

export const metadata: Metadata = {
  title: {
    absolute: APP_TITLE_FOR_LANDING,
  },
}

export default function RootPage() {
  return (
    <RootConnectionHandler>
      <LandingPageContent className="h-dvh" />
    </RootConnectionHandler>
  )
}
RootPage.displayName = "RootPage"
