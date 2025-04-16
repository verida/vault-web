export class VeridaConnectionError extends Error {
  constructor(options?: ErrorOptions) {
    super("Error connecting to Verida", options)
  }
}
