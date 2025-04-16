export class VeridaNotConnectedError extends Error {
  constructor(options?: ErrorOptions) {
    super("User is not connected to Verida", options)
  }
}
