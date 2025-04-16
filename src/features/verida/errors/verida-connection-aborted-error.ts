export class VeridaConnectionAbortedError extends Error {
  constructor(options?: ErrorOptions) {
    super("Connection to Verida aborted", options)
  }
}
