import { useContext } from "react"

import { CommandContext } from "@/features/command/command-context"

export function useCommand() {
  const contextValue = useContext(CommandContext)

  if (!contextValue) {
    throw new Error("useCommand must be used within a CommandProvider")
  }

  return contextValue
}
