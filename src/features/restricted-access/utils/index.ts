import { Logger } from "@/features/telemetry"

const logger = Logger.create("restricted-access")

export type UserAccess = "allowed" | "denied"

export async function getUserAccess(did: string | null): Promise<UserAccess> {
  // TODO: To implement
  logger.debug("Getting user access for", { did })
  return "denied"
}
