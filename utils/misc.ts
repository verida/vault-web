/**
 * Wait for a given number of milliseconds
 *
 * @param ms - Number of milliseconds to wait
 * @returns A promise that resolves after the given number of milliseconds
 */
export async function wait(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
