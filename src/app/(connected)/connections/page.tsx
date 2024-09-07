import { redirect } from "next/navigation"

import { getConnectionsSummaryPageRoute } from "@/features/routes/utils"

export default function ConnectionsPage() {
  // TODO: Set up a redirection in Next.js configuration to get rid of this page
  redirect(getConnectionsSummaryPageRoute())
}
ConnectionsPage.displayName = "ConnectionsPage"
