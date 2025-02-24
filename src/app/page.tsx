import { Metadata } from "next"

import { RootConnectionHandler } from "@/app/_components/root-connection-handler"
import { RootPageContent } from "@/app/_components/root-page-content"
import { APP_TITLE_FOR_LANDING } from "@/constants/app"

export const metadata: Metadata = {
  title: {
    absolute: APP_TITLE_FOR_LANDING,
  },
}

export default function RootPage() {
  return (
    <RootConnectionHandler>
      <RootPageContent />
    </RootConnectionHandler>
  )
}
RootPage.displayName = "RootPage"
