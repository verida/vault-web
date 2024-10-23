import { useContext } from "react"

import { VeridaContext } from "@/features/verida/verida-context"

export const useVerida = () => {
  const context = useContext(VeridaContext)
  if (!context) {
    throw new Error("useVerida must be used within a VeridaProvider")
  }
  return context
}
