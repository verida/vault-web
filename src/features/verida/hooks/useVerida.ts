import { useContext } from "react"

import { VeridaContext } from "../contexts"

export const useVerida = () => {
  const context = useContext(VeridaContext)
  if (!context) {
    throw new Error("useVerida must be used within a VeridaProvider")
  }
  return context
}
