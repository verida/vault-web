import { LandingPageContent } from "@/app/_components/landing-page-content"
import { RootConnectionHandler } from "@/app/_components/root-connection-handler"

export default function RootPage() {
  return (
    <RootConnectionHandler>
      <LandingPageContent />
    </RootConnectionHandler>
  )
}
