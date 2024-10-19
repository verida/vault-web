import { createContext } from "react"

export type CommandContextType = {
  changeCommandState: (state: boolean) => void
  openCommand: () => void
  closeCommand: () => void
  toggleCommand: () => void
  isOpen: boolean
}

export const CommandContext = createContext<CommandContextType | null>(null)
