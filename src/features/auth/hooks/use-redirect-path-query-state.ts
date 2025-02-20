import { createSerializer, parseAsString, useQueryState } from "nuqs"

export function useRedirectPathQueryState() {
  const [redirectPath, setRedirectPath] = useQueryState(
    "redirectPath",
    parseAsString
  )

  const searchParams = {
    redirectPath: parseAsString,
  }

  const serializeRedirectPath = createSerializer(searchParams)

  return { redirectPath, setRedirectPath, serializeRedirectPath }
}
