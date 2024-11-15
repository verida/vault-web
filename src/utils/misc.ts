/**
 * Wait for a given number of milliseconds
 *
 * @param ms - Number of milliseconds to wait
 * @returns A promise that resolves after the given number of milliseconds
 */
export async function wait(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// TODO: To refactor or get rid of in favor of a lib
/**
 * @deprecated Use date-fns instead and build a custom function in `/utils/date.ts` if needed
 */
export function formatDate(date: Date | string) {
  const now = new Date()
  const inputDate = new Date(date)

  const diff = now.getTime() - inputDate.getTime()
  const diffMinutes = Math.floor(diff / 1000 / 60)

  const isToday = now.toDateString() === inputDate.toDateString()
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    inputDate.toDateString()

  if (isToday) {
    if (diffMinutes < 60) {
      return `${diffMinutes} mins ago`
    }
    return "Today"
  } else if (isYesterday) {
    return "Yesterday"
  } else {
    const month = inputDate.getMonth() + 1
    const day = inputDate.getDate()
    const year = inputDate.getFullYear()
    return `${day}/${month}/${year}`
  }
}
