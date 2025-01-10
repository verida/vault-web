import { parseAsString, useQueryState } from "nuqs"
import { useCallback } from "react"

export function useEncodedRequestState() {
  const [encodedRequest, setEncodedRequest] = useQueryState(
    "request",
    parseAsString
  )

  const clear = useCallback(() => {
    setEncodedRequest(null)
  }, [setEncodedRequest])

  return { encodedRequest, clear }
}
