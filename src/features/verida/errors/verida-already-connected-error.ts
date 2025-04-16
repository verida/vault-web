export class VeridaAlreadyConnectedError extends Error {
  constructor(options?: ErrorOptions) {
    super("User is already connected to Verida", options)
  }
}
