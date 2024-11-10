import { VERIDA_DID_REGEXP } from "@/features/verida/constants"

export function truncateDid(
  did: string,
  nbLeadingChar = 5,
  ndTrailingChar = 2
) {
  const elements = did.split(":")
  const key = elements[elements.length - 1]
  const truncatedKey =
    key.substring(0, nbLeadingChar) +
    "..." +
    key.substring(key.length - ndTrailingChar, key.length)
  return did.replace("did:", "").replace(key, truncatedKey)
}

export function isValidVeridaDid(maybeDid: string) {
  return VERIDA_DID_REGEXP.test(maybeDid)
}
