/**
 * Query keys factory for Verida Auth feature.
 *
 * This object provides standardized query keys for React Query
 * to ensure consistent caching and invalidation across the application.
 */
export const VeridaAuthQueryKeys = {
  /**
   * Query key for fetching all auth tokens for a user
   */
  authTokens: (did: string | null) => ["verida-auth", "tokens", did],

  /**
   * Query key for invalidating all auth tokens
   */
  invalidateAuthTokens: () => ["verida-auth", "tokens"],

  /**
   * Query key for fetching a specific auth token
   */
  authToken: ({ did, tokenId }: { did: string | null; tokenId: string }) => [
    "verida-auth",
    "token",
    did,
    tokenId,
  ],

  /**
   * Query key for invalidating a specific auth token
   */
  invalidateAuthToken: (tokenId: string) => [
    "verida-auth",
    "token",
    null,
    tokenId,
  ],

  /**
   * Query key for fetching auth scope definitions
   */
  scopeDefinitions: () => ["verida-auth", "scope-definitions"],

  /**
   * Query key for resolving auth scopes
   */
  resolveScopes: (scopes: string[]) => [
    "verida-auth",
    "resolve-scopes",
    scopes,
  ],
}
