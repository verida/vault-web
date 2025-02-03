import { VERIDA_EXPLORER_BASE_URL } from "@/features/verida-explorer/constants"

export function getVeridaExplorerIdentityPageUrl(did: string) {
  return `${VERIDA_EXPLORER_BASE_URL}/identities/${did}`
}
