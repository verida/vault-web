import { type ReactNode, useEffect, useMemo, useState } from "react"

import { featureFlags } from "@/config/features"
import {
  CommandContext,
  type CommandContextType,
} from "@/features/command/contexts/command-context"
import { useRestrictedAccess } from "@/features/restricted-access/hooks/use-restricted-access"

export interface CommandProviderProps {
  children: ReactNode
}

export function CommandProvider(props: CommandProviderProps) {
  const { children } = props

  const { access } = useRestrictedAccess()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!featureFlags.commandDialog.enabled || access !== "allowed") {
      return
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [access])

  const contextValue: CommandContextType = useMemo(
    () => ({
      changeCommandState: (state: boolean) => setIsOpen(state),
      openCommand: () => setIsOpen(true),
      closeCommand: () => setIsOpen(false),
      toggleCommand: () => setIsOpen((prev) => !prev),
      isOpen:
        featureFlags.commandDialog.enabled && access === "allowed" && isOpen,
    }),
    [isOpen, access]
  )

  return (
    <CommandContext.Provider value={contextValue}>
      {children}
    </CommandContext.Provider>
  )
}
CommandProvider.displayName = "CommandProvider"
