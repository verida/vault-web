import { useEffect, useMemo, useState } from "react"

import {
  CommandContext,
  CommandContextType,
} from "@/features/command/contexts/command-context"

export interface CommandProviderProps {
  children: React.ReactNode
}

export function CommandProvider(props: CommandProviderProps) {
  const { children } = props

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const contextValue: CommandContextType = useMemo(
    () => ({
      changeCommandState: (state: boolean) => setIsOpen(state),
      openCommand: () => setIsOpen(true),
      closeCommand: () => setIsOpen(false),
      toggleCommand: () => setIsOpen((prev) => !prev),
      isOpen,
    }),
    [isOpen]
  )

  return (
    <CommandContext.Provider value={contextValue}>
      {children}
    </CommandContext.Provider>
  )
}
CommandProvider.displayName = "CommandProvider"
