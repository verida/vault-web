import { parseAsString, useQueryState } from "nuqs"
import { useCallback } from "react"

export function useEncodedRequestPayloadState() {
  const [encodedRequestPayload, setEncodedRequestPayload] = useQueryState(
    "payload",
    parseAsString
  )

  const clear = useCallback(() => {
    setEncodedRequestPayload(null)
  }, [setEncodedRequestPayload])

  return { encodedRequestPayload, clear }
}
