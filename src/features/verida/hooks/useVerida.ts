import { useContext } from "react"

import { VeridaContext } from "@/features/verida/contexts/VeridaContext"

export const useVerida = () => {
  const context = useContext(VeridaContext)
  if (!context) {
    throw new Error("useVerida must be used within a VeridaProvider")
  }
  return context
}
