import React from "react"

import { Typography } from "@/components/typography"

export default function AssistantLoadingPage() {
  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Typography>Loading assistant...</Typography>
      </div>
    </div>
  )
}
