export const VeridaProfileQueryKeys = {
  profile: (did: string | null | undefined) => ["verida", "profile", did],
  invalidateProfile: (did: string | null | undefined) => [
    "verida",
    "profile",
    did,
  ],
}
