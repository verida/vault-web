/**
 * Wait for a given number of milliseconds
 *
 * @param ms - Number of milliseconds to wait
 * @returns A promise that resolves after the given number of milliseconds
 */
export async function wait(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Moves an element in an array from one position to another.
 *
 * @param array - The source array to modify
 * @param from - The index to move from
 * @param to - The index to move to (can be negative to count from end)
 * @returns A new array with the element moved to the new position
 */
export function moveItemInArray<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice()
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  )
  return newArray
}
