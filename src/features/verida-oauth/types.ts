export type VeridaOauthScope = {
  database: string
  operation: "read" | "write"
}

export type VeridaOauthPayload = {
  name: string
  url: string
  scopes: VeridaOauthScope[]
}
