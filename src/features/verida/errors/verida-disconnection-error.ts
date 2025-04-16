export class VeridaDisconnectionError extends Error {
  constructor(options?: ErrorOptions) {
    super("Error disconnecting from Verida", options)
  }
}
